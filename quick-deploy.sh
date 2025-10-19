#!/bin/bash
# =============================================================================
# Script de Deploy Rápido - Clone ou Update no Servidor
# =============================================================================

set -e

# =============================================================================
# CONFIGURAÇÕES - EDITE AQUI
# =============================================================================
REPO_URL="git@github.com:MuaiadHadad/MyWebsite.git"
DEPLOY_DIR="/var/www/MyWebsite"
BRANCH="main"
SERVER="user@your-server.com"  # Ex: root@185.123.45.67

# =============================================================================
# CORES
# =============================================================================
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${BLUE}🚀 Iniciando deploy no servidor...${NC}"

# =============================================================================
# EXECUTAR NO SERVIDOR
# =============================================================================
ssh $SERVER << EOF
    set -e

    echo -e "${BLUE}📂 Verificando projeto no servidor...${NC}"

    # Se o diretório existe, atualiza; senão, clona
    if [ -d "$DEPLOY_DIR" ]; then
        echo -e "${YELLOW}📦 Projeto existe. Atualizando...${NC}"
        cd $DEPLOY_DIR
        git fetch origin
        git reset --hard origin/$BRANCH
        git pull origin $BRANCH
        echo -e "${GREEN}✅ Código atualizado!${NC}"
    else
        echo -e "${BLUE}📥 Clonando projeto...${NC}"
        git clone -b $BRANCH $REPO_URL $DEPLOY_DIR
        cd $DEPLOY_DIR
        echo -e "${GREEN}✅ Projeto clonado!${NC}"
    fi

    # Verificar .env
    if [ ! -f .env ]; then
        echo -e "${YELLOW}⚠️  Criando .env...${NC}"
        cp .env.example .env
        echo -e "${RED}❗ IMPORTANTE: Configure o .env com suas credenciais!${NC}"
    fi

    # Instalar dependências
    echo -e "${BLUE}📦 Instalando dependências...${NC}"
    pnpm install

    # Build
    echo -e "${BLUE}🔨 Building...${NC}"
    pnpm run build

    # Reiniciar com PM2
    echo -e "${BLUE}🔄 Reiniciando aplicação...${NC}"
    if command -v pm2 &> /dev/null; then
        pm2 restart mywebsite || pm2 start pnpm --name "mywebsite" -- start
        pm2 save
        echo -e "${GREEN}✅ Aplicação reiniciada com PM2!${NC}"
    else
        echo -e "${YELLOW}⚠️  PM2 não instalado. Inicie manualmente: pnpm start${NC}"
    fi

    echo -e "${GREEN}╔═══════════════════════════════════╗${NC}"
    echo -e "${GREEN}║  ✅ DEPLOY CONCLUÍDO!             ║${NC}"
    echo -e "${GREEN}╚═══════════════════════════════════╝${NC}"
EOF

echo -e "${GREEN}✨ Deploy finalizado com sucesso!${NC}"

