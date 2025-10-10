# MyWebsite - Deployment Guide

Portfolio pessoal construído com Next.js 15, TypeScript, Tailwind CSS e integração com AI Chat.

## 📋 Sumário

- [Tecnologias](#tecnologias)
- [Pré-requisitos](#pré-requisitos)
- [Configuração Local](#configuração-local)
- [Deploy com Docker](#deploy-com-docker)
- [Variáveis de Ambiente](#variáveis-de-ambiente)
- [Manutenção](#manutenção)

## 🚀 Tecnologias

- **Next.js 15.5.4** - Framework React
- **TypeScript** - Tipagem estática
- **Tailwind CSS 4** - Estilização
- **Framer Motion** - Animações
- **OpenAI API** (via GitHub Models) - Chat AI
- **AWS SDK** - Integração S3/MinIO
- **pnpm** - Gerenciador de pacotes

## 📦 Pré-requisitos

### Para desenvolvimento local:
- Node.js 20 ou superior
- pnpm (recomendado) ou npm

### Para deploy com Docker:
- Docker Engine 20.10+
- Docker Compose 2.0+

### Credenciais necessárias:
1. **GitHub Models Token** - Para AI Chat
2. **GitHub Personal Access Token** - Para buscar repositórios (opcional mas recomendado)
3. **MinIO/S3 Credentials** - Para armazenamento de arquivos

## 🔧 Configuração Local

### 1. Clone o repositório

```bash
git clone <seu-repositorio>
cd mywebsite
```

### 2. Instale as dependências

```bash
pnpm install
```

### 3. Configure as variáveis de ambiente

Copie o arquivo de exemplo e configure suas credenciais:

```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas credenciais reais (veja a seção [Variáveis de Ambiente](#variáveis-de-ambiente)).

### 4. Execute em modo de desenvolvimento

```bash
pnpm dev
```

Acesse http://localhost:3000

### 5. Build para produção (local)

```bash
pnpm build
pnpm start
```

## 🐳 Deploy com Docker

### Método 1: Docker Compose (Recomendado)

Este é o método mais simples para deploy em produção.

#### 1. Configure as variáveis de ambiente

Crie o arquivo `.env` na raiz do projeto:

```bash
cp .env.example .env
nano .env  # ou vim, ou seu editor preferido
```

#### 2. Build e start dos containers

```bash
# Build da imagem
docker-compose build

# Iniciar os serviços
docker-compose up -d

# Ver logs
docker-compose logs -f
```

#### 3. Verificar status

```bash
# Status dos containers
docker-compose ps

# Health check
curl http://localhost:3000
```

#### 4. Parar e remover

```bash
# Parar containers
docker-compose down

# Parar e remover volumes
docker-compose down -v
```

### Método 2: Docker Manual

Se preferir controle manual sobre o Docker:

#### 1. Build da imagem

```bash
docker build -t mywebsite:latest .
```

#### 2. Run do container

```bash
docker run -d \
  --name mywebsite \
  -p 3000:3000 \
  --env-file .env \
  --restart unless-stopped \
  mywebsite:latest
```

#### 3. Gerenciar o container

```bash
# Ver logs
docker logs -f mywebsite

# Parar
docker stop mywebsite

# Iniciar novamente
docker start mywebsite

# Remover
docker rm -f mywebsite
```

## 🔐 Variáveis de Ambiente

### Obrigatórias

#### GitHub Models (OpenAI API)
```env
GITHUB_MODELS_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxxx
```
**Como obter:**
1. Acesse https://github.com/settings/tokens
2. Crie um novo token com permissões apropriadas
3. Use o token gerado

#### GitHub API
```env
GITHUB_PUBLIC_USERNAME=seu_username
GITHUB_API_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxxx
```
**Como obter:**
- Username: seu username público do GitHub
- Token: Personal Access Token com permissão `public_repo`

#### MinIO/S3
```env
MINIO_ENDPOINT=http://seu-servidor:9000
MINIO_BUCKET=nome-do-bucket
MINIO_ACCESS_KEY=sua_access_key
MINIO_SECRET_KEY=sua_secret_key
```

**Para AWS S3:**
```env
MINIO_ENDPOINT=https://s3.amazonaws.com
MINIO_FORCE_PATH_STYLE=false
MINIO_REGION=us-east-1
```

**Para MinIO self-hosted:**
```env
MINIO_ENDPOINT=http://minio.seudominio.com:9000
MINIO_FORCE_PATH_STYLE=true
```

### Opcionais

```env
# Modelo AI (padrão: gpt-4o)
GITHUB_MODELS_MODEL=openai/gpt-4o

# Região S3/MinIO (padrão: us-east-1)
MINIO_REGION=us-east-1

# Force path style (true para MinIO, false para AWS S3)
MINIO_FORCE_PATH_STYLE=true

# Next.js
NODE_ENV=production
NEXT_TELEMETRY_DISABLED=1
```

## 🌐 Deploy em Servidor

### Configuração com Nginx Reverse Proxy

Se você está rodando em um servidor com Nginx, adicione esta configuração:

```nginx
server {
    listen 80;
    server_name seudominio.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Com SSL (usando Certbot):
```bash
sudo certbot --nginx -d seudominio.com
```

### Systemd Service (Alternativa ao Docker)

Se preferir rodar sem Docker, crie um serviço systemd:

```bash
sudo nano /etc/systemd/system/mywebsite.service
```

```ini
[Unit]
Description=MyWebsite Next.js App
After=network.target

[Service]
Type=simple
User=seu-usuario
WorkingDirectory=/caminho/para/mywebsite
ExecStart=/usr/bin/pnpm start
Restart=always
Environment=NODE_ENV=production
EnvironmentFile=/caminho/para/mywebsite/.env

[Install]
WantedBy=multi-user.target
```

```bash
sudo systemctl daemon-reload
sudo systemctl enable mywebsite
sudo systemctl start mywebsite
sudo systemctl status mywebsite
```

## 🔄 Atualizações e Manutenção

### Atualizar a aplicação

#### Com Docker Compose:
```bash
# Pull das últimas mudanças
git pull

# Rebuild e restart
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

#### Com Docker manual:
```bash
git pull
docker stop mywebsite
docker rm mywebsite
docker build -t mywebsite:latest .
docker run -d --name mywebsite -p 3000:3000 --env-file .env --restart unless-stopped mywebsite:latest
```

### Backup

```bash
# Backup do código e configurações
tar -czf backup-mywebsite-$(date +%Y%m%d).tar.gz \
  --exclude=node_modules \
  --exclude=.next \
  --exclude=.git \
  /caminho/para/mywebsite
```

### Logs

```bash
# Docker Compose
docker-compose logs -f --tail=100

# Docker manual
docker logs -f --tail=100 mywebsite

# Systemd
sudo journalctl -u mywebsite -f
```

### Monitoramento

```bash
# Verificar saúde do container
docker inspect --format='{{.State.Health.Status}}' mywebsite

# Recursos utilizados
docker stats mywebsite

# Espaço em disco
docker system df
```

## 🔍 Troubleshooting

### Container não inicia

```bash
# Verificar logs
docker-compose logs

# Verificar variáveis de ambiente
docker-compose config
```

### Erro de conexão com APIs

1. Verifique se todas as variáveis de ambiente estão configuradas
2. Teste as credenciais manualmente
3. Verifique firewalls e portas

### Build falha

```bash
# Limpar cache do Docker
docker builder prune -a

# Rebuild sem cache
docker-compose build --no-cache
```

### Porta 3000 já em uso

```bash
# Encontrar processo usando a porta
lsof -i :3000

# Matar o processo
kill -9 <PID>

# Ou mudar a porta no docker-compose.yml
ports:
  - "3001:3000"
```

## 📊 Performance

### Otimizações recomendadas:

1. **CDN**: Use Cloudflare ou similar para cache estático
2. **Compressão**: Nginx já comprime automaticamente
3. **Imagens**: Otimize imagens na pasta `/public`
4. **Cache**: Next.js já implementa cache automático

### Recursos recomendados do servidor:

- **Mínimo**: 1 vCPU, 1GB RAM
- **Recomendado**: 2 vCPU, 2GB RAM
- **Armazenamento**: 10GB+

## 📝 Segurança

### Checklist de Segurança:

- [ ] Nunca commitar arquivo `.env` no Git
- [ ] Usar HTTPS em produção (Certbot/Let's Encrypt)
- [ ] Manter dependências atualizadas: `pnpm update`
- [ ] Configurar firewall para permitir apenas portas necessárias
- [ ] Usar tokens com permissões mínimas necessárias
- [ ] Fazer backup regular das configurações
- [ ] Monitorar logs para atividades suspeitas

## 📞 Suporte

Para problemas ou dúvidas:
1. Verifique os logs
2. Consulte a documentação do Next.js: https://nextjs.org/docs
3. Verifique as issues do repositório

## 📄 Licença

Ver arquivo `LICENSE` na raiz do projeto.

---

**Última atualização**: Outubro 2025

