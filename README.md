# MyWebsite - Portfolio Pessoal

Portfolio pessoal construído com Next.js 15, TypeScript, Tailwind CSS e integração com AI Chat.

## 🚀 Início Rápido

```bash
# Instalar dependências
pnpm install

# Configurar variáveis de ambiente
cp .env.example .env
# Edite o .env com suas credenciais

# Desenvolvimento
pnpm dev

# Build para produção
pnpm build
pnpm start
```

Acesse [http://localhost:3000](http://localhost:3000)

## 🐳 Deploy com Docker

```bash
# Configurar variáveis de ambiente
cp .env.example .env
# Edite o .env com suas credenciais

# Build e iniciar
docker-compose up -d

# Ver logs
docker-compose logs -f
```

## 📚 Documentação Completa

Para instruções detalhadas de deployment, configuração e troubleshooting, consulte o **[DEPLOYMENT.md](./DEPLOYMENT.md)**.

## 🛠️ Tecnologias

- **Next.js 15.5.4** - Framework React
- **TypeScript** - Tipagem estática
- **Tailwind CSS 4** - Estilização
- **Framer Motion** - Animações
- **OpenAI API** (via GitHub Models) - Chat AI
- **AWS SDK** - Integração S3/MinIO

## 📋 Features

- ✅ Design responsivo e moderno
- ✅ Chat AI integrado com OpenAI
- ✅ Integração com GitHub para exibir repositórios
- ✅ Upload e gerenciamento de arquivos via S3/MinIO
- ✅ Animações suaves com Framer Motion
- ✅ Otimizado para produção
- ✅ Suporte Docker

## 🔐 Variáveis de Ambiente

Copie `.env.example` para `.env` e configure:

```env
# GitHub Models (OpenAI)
GITHUB_MODELS_TOKEN=seu_token_aqui

# GitHub API
GITHUB_PUBLIC_USERNAME=seu_username
GITHUB_API_TOKEN=seu_github_token

# MinIO/S3
MINIO_ENDPOINT=http://seu-servidor:9000
MINIO_BUCKET=nome-do-bucket
MINIO_ACCESS_KEY=sua_access_key
MINIO_SECRET_KEY=sua_secret_key
```

## 📦 Scripts Disponíveis

- `pnpm dev` - Inicia servidor de desenvolvimento
- `pnpm build` - Build para produção
- `pnpm start` - Inicia servidor de produção

## 📖 Aprenda Mais

- [Next.js Documentation](https://nextjs.org/docs)
- [Deployment Guide](./DEPLOYMENT.md) - Guia completo de deploy

## 📄 Licença

Ver arquivo `LICENSE`
