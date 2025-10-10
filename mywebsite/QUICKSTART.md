# Quick Start Guide - MyWebsite

## 🎯 Deploy em 5 Minutos

### 1. Pré-requisitos
```bash
# Verificar Docker
docker --version

# Verificar Docker Compose
docker-compose --version
```

### 2. Clonar e Configurar
```bash
# Clone o repositório
git clone <seu-repo>
cd mywebsite

# Copie o arquivo de ambiente
cp .env.example .env

# Edite com suas credenciais
nano .env  # ou vim, code, etc.
```

### 3. Deploy Automático
```bash
# Execute o script de deploy
./deploy.sh
```

Pronto! A aplicação estará rodando em http://localhost:3000

### 4. Comandos Úteis

```bash
# Ver logs em tempo real
docker-compose logs -f

# Parar aplicação
docker-compose down

# Reiniciar aplicação
docker-compose restart

# Verificar saúde
./health-check.sh

# Rebuild completo
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

## 🔑 Credenciais Necessárias

### GitHub Models Token
1. Vá para https://github.com/settings/tokens
2. Gere um novo token
3. Cole em `GITHUB_MODELS_TOKEN`

### GitHub API Token
1. Use o mesmo token acima ou crie outro
2. Precisa de permissão `public_repo`
3. Cole em `GITHUB_API_TOKEN`

### MinIO/S3
- Se usar MinIO local, configure endpoint como `http://minio:9000`
- Se usar AWS S3, configure endpoint como `https://s3.amazonaws.com`
- Configure bucket, access key e secret key

## 🚨 Troubleshooting Rápido

### Porta 3000 já em uso
```bash
# Encontrar processo
lsof -i :3000

# Ou mudar porta no docker-compose.yml
ports:
  - "3001:3000"
```

### Container não inicia
```bash
# Ver logs detalhados
docker-compose logs

# Verificar variáveis
docker-compose config
```

### Build falha
```bash
# Limpar tudo e tentar novamente
docker-compose down -v
docker system prune -a
./deploy.sh
```

## 📊 Monitoramento

```bash
# Status dos containers
docker-compose ps

# Uso de recursos
docker stats mywebsite

# Logs específicos
docker-compose logs mywebsite

# Health check
./health-check.sh
```

## 🔄 Atualização

```bash
# Pull das mudanças
git pull

# Redeploy
./deploy.sh
```

## 📚 Documentação Completa

Para detalhes completos, veja [DEPLOYMENT.md](./DEPLOYMENT.md)
#!/bin/bash
# Health check script para verificar o status da aplicação

echo "🏥 Verificando saúde da aplicação..."
echo ""

# Verificar se o container está rodando
if docker-compose ps | grep -q "Up"; then
    echo "✅ Container está rodando"
else
    echo "❌ Container não está rodando"
    exit 1
fi

# Verificar se a aplicação responde
if curl -f -s http://localhost:3000 > /dev/null; then
    echo "✅ Aplicação está respondendo"
else
    echo "❌ Aplicação não está respondendo"
    exit 1
fi

# Mostrar recursos utilizados
echo ""
echo "📊 Uso de recursos:"
docker stats --no-stream mywebsite

echo ""
echo "✅ Todos os checks passaram!"

