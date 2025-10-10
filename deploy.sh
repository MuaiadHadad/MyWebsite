#!/bin/bash
# Script de deploy automatizado para MyWebsite

set -e  # Exit on error

echo "🚀 Iniciando processo de deploy..."

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Verificar se .env existe
if [ ! -f .env ]; then
    echo -e "${RED}❌ Arquivo .env não encontrado!${NC}"
    echo -e "${YELLOW}📝 Copie .env.example para .env e configure suas credenciais:${NC}"
    echo "   cp .env.example .env"
    exit 1
fi

echo -e "${GREEN}✅ Arquivo .env encontrado${NC}"

# Verificar se Docker está instalado
if ! command -v docker &> /dev/null; then
    echo -e "${RED}❌ Docker não está instalado!${NC}"
    echo "   Instale Docker: https://docs.docker.com/get-docker/"
    exit 1
fi

echo -e "${GREEN}✅ Docker instalado${NC}"

# Verificar se Docker Compose está instalado
if ! command -v docker-compose &> /dev/null; then
    echo -e "${RED}❌ Docker Compose não está instalado!${NC}"
    echo "   Instale Docker Compose: https://docs.docker.com/compose/install/"
    exit 1
fi

echo -e "${GREEN}✅ Docker Compose instalado${NC}"

# Parar containers existentes
echo -e "${YELLOW}🛑 Parando containers existentes...${NC}"
docker-compose down || true

# Build da nova imagem
echo -e "${YELLOW}🔨 Building nova imagem Docker...${NC}"
docker-compose build --no-cache

# Iniciar containers
echo -e "${YELLOW}🚀 Iniciando containers...${NC}"
docker-compose up -d

# Aguardar container ficar saudável
echo -e "${YELLOW}⏳ Aguardando container ficar saudável...${NC}"
sleep 10

# Verificar se está rodando
if docker-compose ps | grep -q "Up"; then
    echo -e "${GREEN}✅ Deploy concluído com sucesso!${NC}"
    echo ""
    echo "📊 Status dos containers:"
    docker-compose ps
    echo ""
    echo "📝 Para ver os logs:"
    echo "   docker-compose logs -f"
    echo ""
    echo "🌐 Aplicação disponível em: http://localhost:3000"
else
    echo -e "${RED}❌ Erro ao iniciar containers${NC}"
    echo "📝 Verificar logs:"
    docker-compose logs
    exit 1
fi

