#!/bin/bash
# =============================================================================
# Script de Deploy Automatizado - MyWebsite
# Autor: Muaiad Hadad
# Descrição: Clone ou atualiza o projeto no servidor e faz deploy
# =============================================================================

set -e  # Exit on error

# =============================================================================
# CONFIGURAÇÕES - EDITE ESTAS VARIÁVEIS
# =============================================================================
REPO_URL="git@github.com:MuaiadHadad/MyWebsite.git"  # URL do seu repositório
PROJECT_NAME="MyWebsite"
DEPLOY_DIR="/var/www/${PROJECT_NAME}"  # Diretório de deploy no servidor
BRANCH="main"  # Branch principal
SERVER_USER="root"  # Usuário do servidor
SERVER_HOST="muaiadhadad.me"  # Endereço do servidor
PM2_APP_NAME="mywebsite"  # Nome da aplicação no PM2

# =============================================================================
# CORES PARA OUTPUT
# =============================================================================
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# =============================================================================
# FUNÇÕES AUXILIARES
# =============================================================================

print_header() {
    echo ""
    echo -e "${CYAN}╔════════════════════════════════════════════════════════════╗${NC}"
    echo -e "${CYAN}║${NC}  $1"
    echo -e "${CYAN}╚════════════════════════════════════════════════════════════╝${NC}"
    echo ""
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

# =============================================================================
# VERIFICAÇÕES PRÉ-DEPLOY
# =============================================================================

check_git() {
    if ! command -v git &> /dev/null; then
        print_error "Git não está instalado!"
        exit 1
    fi
    print_success "Git instalado"
}

check_ssh_key() {
    if [ ! -f ~/.ssh/id_rsa ] && [ ! -f ~/.ssh/id_ed25519 ]; then
        print_warning "Nenhuma chave SSH encontrada. Configure: ssh-keygen -t ed25519 -C 'your@email.com'"
    fi
}

# =============================================================================
# FUNÇÃO PRINCIPAL DE DEPLOY LOCAL
# =============================================================================

deploy_local() {
    print_header "🚀 DEPLOY LOCAL"

    # Verificar se estamos no diretório correto
    if [ ! -f "package.json" ]; then
        print_error "package.json não encontrado. Execute o script na raiz do projeto!"
        exit 1
    fi

    print_info "Verificando Git status..."
    if [ -n "$(git status --porcelain)" ]; then
        print_warning "Você tem alterações não commitadas!"
        read -p "Deseja continuar mesmo assim? (y/n) " -n 1 -r
        echo
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            print_info "Deploy cancelado."
            exit 0
        fi
    fi

    print_info "Fazendo pull das últimas alterações..."
    git pull origin $BRANCH

    print_info "Instalando dependências..."
    pnpm install

    print_info "Fazendo build do projeto..."
    pnpm run build

    print_success "Deploy local concluído!"

    print_info "Para iniciar o servidor: pnpm start"
}

# =============================================================================
# FUNÇÃO DE DEPLOY NO SERVIDOR VIA SSH
# =============================================================================

deploy_server() {
    print_header "🌐 DEPLOY NO SERVIDOR"

    print_info "Conectando ao servidor ${SERVER_HOST}..."

    # Script que será executado no servidor
    ssh ${SERVER_USER}@${SERVER_HOST} << 'ENDSSH'
        set -e

        # Cores no servidor
        RED='\033[0;31m'
        GREEN='\033[0;32m'
        YELLOW='\033[1;33m'
        BLUE='\033[0;34m'
        NC='\033[0m'

        REPO_URL="REPO_URL_PLACEHOLDER"
        DEPLOY_DIR="DEPLOY_DIR_PLACEHOLDER"
        BRANCH="BRANCH_PLACEHOLDER"
        PM2_APP_NAME="PM2_APP_NAME_PLACEHOLDER"

        echo -e "${BLUE}📂 Verificando diretório de deploy...${NC}"

        if [ -d "$DEPLOY_DIR" ]; then
            echo -e "${YELLOW}Diretório existe. Atualizando...${NC}"
            cd $DEPLOY_DIR

            # Verificar se é um repositório git válido
            if [ -d ".git" ]; then
                echo -e "${BLUE}🔄 Fazendo pull das últimas alterações...${NC}"
                git fetch origin
                git reset --hard origin/$BRANCH
                git pull origin $BRANCH
            else
                echo -e "${RED}Diretório existe mas não é um repositório Git!${NC}"
                echo -e "${YELLOW}Removendo e clonando novamente...${NC}"
                cd ..
                rm -rf $DEPLOY_DIR
                git clone -b $BRANCH $REPO_URL $DEPLOY_DIR
                cd $DEPLOY_DIR
            fi
        else
            echo -e "${BLUE}📥 Clonando repositório...${NC}"
            mkdir -p $(dirname $DEPLOY_DIR)
            git clone -b $BRANCH $REPO_URL $DEPLOY_DIR
            cd $DEPLOY_DIR
        fi

        echo -e "${GREEN}✅ Código atualizado${NC}"

        # Verificar se .env existe
        if [ ! -f ".env" ]; then
            echo -e "${YELLOW}⚠️  Arquivo .env não encontrado!${NC}"
            echo -e "${BLUE}Criando .env a partir do .env.example...${NC}"
            if [ -f ".env.example" ]; then
                cp .env.example .env
                echo -e "${YELLOW}⚠️  IMPORTANTE: Configure o arquivo .env com suas credenciais!${NC}"
            else
                echo -e "${RED}❌ .env.example não encontrado!${NC}"
            fi
        fi

        # Instalar dependências
        echo -e "${BLUE}📦 Instalando dependências...${NC}"
        if command -v pnpm &> /dev/null; then
            pnpm install --prod
        elif command -v npm &> /dev/null; then
            npm install --production
        else
            echo -e "${RED}❌ npm/pnpm não encontrado!${NC}"
            exit 1
        fi

        # Build do projeto
        echo -e "${BLUE}🔨 Building projeto...${NC}"
        if command -v pnpm &> /dev/null; then
            pnpm run build
        else
            npm run build
        fi

        # Gerenciar PM2 (Process Manager)
        echo -e "${BLUE}🔄 Gerenciando processo com PM2...${NC}"
        if command -v pm2 &> /dev/null; then
            # Verificar se a aplicação já está rodando
            if pm2 list | grep -q "$PM2_APP_NAME"; then
                echo -e "${YELLOW}Reiniciando aplicação...${NC}"
                pm2 restart $PM2_APP_NAME
            else
                echo -e "${BLUE}Iniciando aplicação...${NC}"
                if command -v pnpm &> /dev/null; then
                    pm2 start pnpm --name "$PM2_APP_NAME" -- start
                else
                    pm2 start npm --name "$PM2_APP_NAME" -- start
                fi
            fi

            # Salvar configuração do PM2
            pm2 save

            echo -e "${GREEN}✅ Aplicação rodando com PM2${NC}"
            pm2 status
        else
            echo -e "${YELLOW}⚠️  PM2 não está instalado. Instale com: npm install -g pm2${NC}"
            echo -e "${BLUE}Iniciando servidor diretamente...${NC}"
            if command -v pnpm &> /dev/null; then
                pnpm start &
            else
                npm start &
            fi
        fi

        echo -e "${GREEN}╔════════════════════════════════════════════════════════════╗${NC}"
        echo -e "${GREEN}║  ✅ DEPLOY CONCLUÍDO COM SUCESSO!                         ║${NC}"
        echo -e "${GREEN}╚════════════════════════════════════════════════════════════╝${NC}"
ENDSSH

    # Substituir placeholders no script SSH
    ssh ${SERVER_USER}@${SERVER_HOST} "sed -i 's|REPO_URL_PLACEHOLDER|${REPO_URL}|g; s|DEPLOY_DIR_PLACEHOLDER|${DEPLOY_DIR}|g; s|BRANCH_PLACEHOLDER|${BRANCH}|g; s|PM2_APP_NAME_PLACEHOLDER|${PM2_APP_NAME}|g' /tmp/deploy_script.sh 2>/dev/null || true"

    print_success "Deploy no servidor concluído!"
}

# =============================================================================
# FUNÇÃO DE DEPLOY COM DOCKER
# =============================================================================

deploy_docker() {
    print_header "🐳 DEPLOY COM DOCKER"

    print_info "Verificando Docker..."
    if ! command -v docker &> /dev/null; then
        print_error "Docker não está instalado!"
        exit 1
    fi

    print_info "Parando containers existentes..."
    docker-compose down || true

    print_info "Building imagem Docker..."
    docker-compose build --no-cache

    print_info "Iniciando containers..."
    docker-compose up -d

    print_info "Verificando status dos containers..."
    docker-compose ps

    print_success "Deploy Docker concluído!"

    print_info "Logs: docker-compose logs -f"
}

# =============================================================================
# MENU PRINCIPAL
# =============================================================================

show_menu() {
    clear
    echo -e "${CYAN}"
    echo "╔════════════════════════════════════════════════════════════╗"
    echo "║                                                            ║"
    echo "║        🚀 SCRIPT DE DEPLOY - MYWEBSITE 🚀                 ║"
    echo "║                                                            ║"
    echo "╚════════════════════════════════════════════════════════════╝"
    echo -e "${NC}"
    echo ""
    echo -e "${YELLOW}Selecione o tipo de deploy:${NC}"
    echo ""
    echo "  1) 💻 Deploy Local (build e start local)"
    echo "  2) 🌐 Deploy Servidor (via SSH)"
    echo "  3) 🐳 Deploy Docker (containers)"
    echo "  4) 🔄 Deploy Completo (Local + Servidor)"
    echo "  5) ℹ️  Mostrar informações"
    echo "  6) ❌ Sair"
    echo ""
    echo -n "Digite sua escolha [1-6]: "
}

show_info() {
    print_header "ℹ️  INFORMAÇÕES DO PROJETO"
    echo -e "${BLUE}Repositório:${NC} $REPO_URL"
    echo -e "${BLUE}Branch:${NC} $BRANCH"
    echo -e "${BLUE}Servidor:${NC} ${SERVER_USER}@${SERVER_HOST}"
    echo -e "${BLUE}Diretório:${NC} $DEPLOY_DIR"
    echo -e "${BLUE}PM2 App:${NC} $PM2_APP_NAME"
    echo ""
    echo -e "${YELLOW}Comandos úteis:${NC}"
    echo "  - Ver logs: pm2 logs $PM2_APP_NAME"
    echo "  - Restart: pm2 restart $PM2_APP_NAME"
    echo "  - Stop: pm2 stop $PM2_APP_NAME"
    echo "  - Status: pm2 status"
    echo ""
}

# =============================================================================
# SCRIPT PRINCIPAL
# =============================================================================

main() {
    # Verificações iniciais
    check_git
    check_ssh_key

    while true; do
        show_menu
        read -r choice

        case $choice in
            1)
                deploy_local
                ;;
            2)
                deploy_server
                ;;
            3)
                deploy_docker
                ;;
            4)
                deploy_local
                deploy_server
                ;;
            5)
                show_info
                ;;
            6)
                print_info "Até logo! 👋"
                exit 0
                ;;
            *)
                print_error "Opção inválida! Por favor escolha 1-6."
                ;;
        esac

        echo ""
        echo -e "${YELLOW}Pressione ENTER para voltar ao menu...${NC}"
        read
    done
}

# Executar script principal
main

