# Adsumtec - Plataforma de Construção e Reforma

## 📋 Sobre o Projeto

A Soba Construção Civíl é uma plataforma web moderna para gerenciamento de projetos de construção, reforma e decoração. Desenvolvida com React, TypeScript e Tailwind CSS, oferece uma experiência rica e intuitiva para usuários que buscam transformar seus sonhos em realidade.

### 🌟 Funcionalidades Principais

- **Cadastro de Usuários**: Sistema completo de registro com validações
- **Agendamento de Visitas**: Interface intuitiva para agendar visitas técnicas
- **Galeria de Projetos**: Showcase de projetos realizados com animações
- **Blog e Inspirações**: Seção de conteúdo e ideias para projetos
- **Políticas e Termos**: Documentação legal completa e transparente

## 🚀 Tecnologias Utilizadas

- React 18.x
- TypeScript
- Tailwind CSS
- Shadcn/UI
- Framer Motion
- React Router DOM
- Zod
- React Hook Form
- Docker
- AWS (ECS, ECR, ALB)
- Terraform

## 💻 Requisitos de Sistema

- Node.js 20.x ou superior
- npm 9.x ou superior
- Docker e Docker Compose (para ambiente containerizado)

## 🛠️ Instalação e Execução Local

### Método 1: Execução Direta

1. Clone o repositório:
   ```bash
   git clone https://github.com/sua-org/adsumtec.git
   cd adsumtec
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Execute o projeto:
   ```bash
   npm run dev
   ```

4. Acesse http://localhost:5173

### Método 2: Usando Docker

1. Construa a imagem:
   ```bash
   docker-compose build
   ```

2. Execute o container:
   ```bash
   docker-compose up
   ```

3. Acesse http://localhost:80

## 📦 Estrutura do Projeto

```
adsumtec/
├── src/
│   ├── components/    # Componentes reutilizáveis
│   ├── pages/        # Páginas da aplicação
│   ├── hooks/        # Hooks personalizados
│   ├── lib/          # Utilitários e configurações
│   └── styles/       # Estilos globais
├── terraform/        # Infraestrutura como código
├── .github/         # Workflows do GitHub Actions
└── docker/          # Configurações Docker
```

## 🔧 Configuração de Ambiente

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
VITE_API_URL=http://localhost:3000
VITE_CONTACT_EMAIL=contato@adsumtec.com.br
```

### Configuração do AWS CLI

```bash
aws configure
AWS Access Key ID: [sua-access-key]
AWS Secret Access Key: [sua-secret-key]
Default region name: us-east-1
```

## 📝 Desenvolvimento

### Padrões de Código

- Utilize TypeScript para todo código novo
- Siga o padrão de componentes funcionais
- Mantenha componentes pequenos e reutilizáveis
- Use CSS Modules ou Tailwind para estilos
- Documente funções e componentes complexos

### Commits

Siga o padrão Conventional Commits:

- `feat:` Nova funcionalidade
- `fix:` Correção de bug
- `docs:` Documentação
- `style:` Formatação
- `refactor:` Refatoração
- `test:` Testes
- `chore:` Manutenção

## 🚀 Deploy

### Deploy Local com Docker

```bash
# Construir imagem
docker build -t adsumtec-web .

# Executar container
docker run -p 80:80 adsumtec-web
```

### Deploy na AWS

1. Configure as credenciais AWS
2. Execute o Terraform:
   ```bash
   cd terraform
   terraform init
   terraform plan
   terraform apply
   ```

3. Push para main dispara pipeline:
   ```bash
   git push origin main
   ```

## 📚 Documentação Adicional

- [Guia de Componentes](./docs/COMPONENTS.md)
- [Guia de Estilo](./docs/STYLE_GUIDE.md)
- [Arquitetura](./docs/ARCHITECTURE.md)

## 🤝 Contribuição

1. Fork o projeto
2. Crie sua branch: `git checkout -b feature/nova-funcionalidade`
3. Commit suas mudanças: `git commit -m 'feat: Adiciona nova funcionalidade'`
4. Push para a branch: `git push origin feature/nova-funcionalidade`
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 📧 Contato

- Email: contato@adsumtec.com.br
- Website: https://adsumtec.com.br
- LinkedIn: https://linkedin.com/company/adsumtec