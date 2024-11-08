terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
  
  backend "s3" {
    bucket = "soba-terraform-state"
    key    = "prod/terraform.tfstate"
    region = "us-east-1"
  }
}

provider "aws" {
  region = var.aws_region
}

# VPC
module "vpc" {
  source = "./modules/vpc"
  
  vpc_cidr           = "10.0.0.0/16"
  availability_zones = ["us-east-1a", "us-east-1b"]
  environment        = var.environment
}

# Security Groups
module "security" {
  source = "./modules/security"
  
  vpc_id         = module.vpc.vpc_id
  environment    = var.environment
  container_port = 80
}

# ECR Repository
resource "aws_ecr_repository" "app" {
  name = var.ecr_repository
  
  image_scanning_configuration {
    scan_on_push = true
  }
  
  encryption_configuration {
    encryption_type = "KMS"
  }
}

# SSM Parameters for secrets
resource "aws_ssm_parameter" "database_url" {
  name  = "/${var.environment}/database_url"
  type  = "SecureString"
  value = "postgresql://${var.db_user}:${var.db_password}@${module.rds.endpoint}/${var.db_name}"
}

resource "aws_ssm_parameter" "smtp_config" {
  name  = "/${var.environment}/smtp"
  type  = "SecureString"
  value = jsonencode({
    host     = var.smtp_host
    port     = var.smtp_port
    user     = var.smtp_user
    password = var.smtp_password
  })
}

# EC2 Instance
resource "aws_instance" "web" {
  ami           = "ami-0c7217cdde317cfec" # Amazon Linux 2023 AMI
  instance_type = "t2.micro"
  
  subnet_id                   = module.vpc.public_subnets[0]
  vpc_security_group_ids      = [module.security.ec2_sg_id]
  associate_public_ip_address = true
  
  user_data = <<-EOF
              #!/bin/bash
              yum update -y
              yum install -y docker
              service docker start
              usermod -a -G docker ec2-user
              curl -L https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m) -o /usr/local/bin/docker-compose
              chmod +x /usr/local/bin/docker-compose
              
              # Configure environment variables
              aws ssm get-parameter --name /${var.environment}/database_url --with-decryption --region ${var.aws_region} --query Parameter.Value --output text > /home/ec2-user/app/.env
              aws ssm get-parameter --name /${var.environment}/smtp --with-decryption --region ${var.aws_region} --query Parameter.Value --output text | jq -r 'to_entries | .[] | "\(.key)=\(.value)"' >> /home/ec2-user/app/.env
              EOF
  
  iam_instance_profile = aws_iam_instance_profile.ec2_profile.name
  
  tags = {
    Name        = "${var.environment}-web-server"
    Environment = var.environment
  }
}

# RDS Instance
module "rds" {
  source = "./modules/rds"
  
  identifier     = "${var.environment}-db"
  engine         = "postgres"
  engine_version = "15.5"
  instance_class = "db.t3.micro"
  
  allocated_storage = 20
  
  db_name  = var.db_name
  username = var.db_user
  password = var.db_password
  
  vpc_security_group_ids = [module.security.rds_sg_id]
  subnet_ids            = module.vpc.private_subnets
  
  environment = var.environment
}

# Route 53
resource "aws_route53_zone" "main" {
  name = var.domain_name
  
  tags = {
    Environment = var.environment
  }
}

resource "aws_route53_record" "www" {
  zone_id = aws_route53_zone.main.zone_id
  name    = "www.${var.domain_name}"
  type    = "A"
  
  alias {
    name                   = aws_instance.web.public_dns
    zone_id                = aws_instance.web.zone_id
    evaluate_target_health = true
  }
}

# IAM
resource "aws_iam_role" "ec2_role" {
  name = "${var.environment}-ec2-role"
  
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "ec2.amazonaws.com"
        }
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "ssm_policy" {
  role       = aws_iam_role.ec2_role.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonSSMManagedInstanceCore"
}

resource "aws_iam_role_policy_attachment" "ecr_policy" {
  role       = aws_iam_role.ec2_role.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonEC2ContainerRegistryReadOnly"
}

resource "aws_iam_instance_profile" "ec2_profile" {
  name = "${var.environment}-ec2-profile"
  role = aws_iam_role.ec2_role.name
}

# GitHub Actions Role
resource "aws_iam_role" "github_actions" {
  name = "${var.environment}-github-actions"
  
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRoleWithWebIdentity"
        Effect = "Allow"
        Principal = {
          Federated = "arn:aws:iam::${data.aws_caller_identity.current.account_id}:oidc-provider/token.actions.githubusercontent.com"
        }
        Condition = {
          StringLike = {
            "token.actions.githubusercontent.com:sub": "repo:${var.github_repo}:*"
          }
        }
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "github_actions_ecr" {
  role       = aws_iam_role.github_actions.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonEC2ContainerRegistryPowerUser"
}

# Output the GitHub Actions role ARN
output "github_actions_role_arn" {
  value = aws_iam_role.github_actions.arn
}