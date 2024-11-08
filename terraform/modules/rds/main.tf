resource "aws_db_subnet_group" "main" {
  name       = "${var.identifier}-subnet-group"
  subnet_ids = var.subnet_ids
  
  tags = {
    Name        = "${var.identifier}-subnet-group"
    Environment = var.environment
  }
}

resource "aws_db_instance" "main" {
  identifier = var.identifier
  
  engine         = var.engine
  engine_version = var.engine_version
  instance_class = var.instance_class
  
  allocated_storage = var.allocated_storage
  storage_type      = "gp2"
  
  db_name  = var.db_name
  username = var.username
  password = var.password
  
  vpc_security_group_ids = var.vpc_security_group_ids
  db_subnet_group_name   = aws_db_subnet_group.main.name
  
  backup_retention_period = 7
  backup_window          = "03:00-04:00"
  maintenance_window     = "Mon:04:00-Mon:05:00"
  
  multi_az               = false
  publicly_accessible    = false
  skip_final_snapshot    = true
  
  tags = {
    Name        = var.identifier
    Environment = var.environment
  }
}