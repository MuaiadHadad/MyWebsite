.PHONY: help install dev build start deploy stop restart logs clean health

help: ## Mostrar esta mensagem de ajuda
	@echo "📚 Comandos disponíveis:"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2}'

install: ## Instalar dependências
	@echo "📦 Instalando dependências..."
	pnpm install

dev: ## Iniciar servidor de desenvolvimento
	@echo "🚀 Iniciando servidor de desenvolvimento..."
	pnpm dev

build: ## Build para produção (local)
	@echo "🔨 Building para produção..."
	pnpm build

start: ## Iniciar servidor de produção (local)
	@echo "▶️  Iniciando servidor de produção..."
	pnpm start

deploy: ## Deploy com Docker
	@echo "🚀 Fazendo deploy com Docker..."
	./deploy.sh

docker-build: ## Build da imagem Docker
	@echo "🔨 Building imagem Docker..."
	docker-compose build

docker-up: ## Iniciar containers Docker
	@echo "▶️  Iniciando containers..."
	docker-compose up -d

docker-down: ## Parar containers Docker
	@echo "🛑 Parando containers..."
	docker-compose down

stop: docker-down ## Alias para docker-down

restart: ## Reiniciar containers Docker
	@echo "🔄 Reiniciando containers..."
	docker-compose restart

logs: ## Ver logs dos containers
	@echo "📝 Logs dos containers:"
	docker-compose logs -f

logs-tail: ## Ver últimas 100 linhas dos logs
	@echo "📝 Últimas 100 linhas dos logs:"
	docker-compose logs --tail=100

health: ## Verificar saúde da aplicação
	@echo "🏥 Verificando saúde..."
	./health-check.sh

status: ## Ver status dos containers
	@echo "📊 Status dos containers:"
	docker-compose ps

clean: ## Limpar containers, volumes e cache
	@echo "🧹 Limpando containers e volumes..."
	docker-compose down -v
	docker system prune -f

clean-all: ## Limpar tudo incluindo imagens
	@echo "🧹 Limpando tudo..."
	docker-compose down -v
	docker system prune -a -f

rebuild: clean docker-build docker-up ## Rebuild completo

update: ## Atualizar e fazer redeploy
	@echo "🔄 Atualizando aplicação..."
	git pull
	$(MAKE) deploy

backup: ## Fazer backup da aplicação
	@echo "💾 Fazendo backup..."
	tar -czf backup-mywebsite-$$(date +%Y%m%d-%H%M%S).tar.gz \
		--exclude=node_modules \
		--exclude=.next \
		--exclude=.git \
		.

env-example: ## Copiar .env.example para .env
	@echo "📝 Copiando .env.example para .env..."
	cp .env.example .env
	@echo "✅ Arquivo .env criado. Configure suas credenciais!"

check-env: ## Verificar se .env existe
	@if [ -f .env ]; then \
		echo "✅ Arquivo .env encontrado"; \
	else \
		echo "❌ Arquivo .env não encontrado"; \
		echo "Execute: make env-example"; \
		exit 1; \
	fi

