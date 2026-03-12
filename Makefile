-include .env.makefile
export


.PHONY: ssh
ssh:
	ssh $(SSH_USER)@$(SSH_HOST)

.PHONY: ci
ci:
	rsync -ova . $(SSH_USER)@$(SSH_HOST):/app --exclude '.git' --exclude 'dev_tg_app' --exclude '.idea' --exclude '.mypy_cache' --exclude '.venv' --exclude 'node_modules' --exclude '.env' --exclude 'backups' --delete

.PHONY: backup
backup:
	$(eval BACKUP_DIR := backups/$(shell date +%Y-%m-%d_%H-%M-%S))
	$(eval BACKUP_ARCHIVE := $(BACKUP_DIR).tar.gz)
	mkdir -p $(BACKUP_DIR)
	@echo "==> [1/3] Дамп PostgreSQL..."
	ssh $(SSH_USER)@$(SSH_HOST) "su - postgres -c 'pg_dumpall'" > $(BACKUP_DIR)/postgres_all.sql
	@echo "==> [2/3] Копирование /app..."
	rsync -ova --exclude 'node_modules' $(SSH_USER)@$(SSH_HOST):/app/ $(BACKUP_DIR)/app/
	@echo "==> [3/3] Конфиги nginx (sites-available)..."
	rsync -ova $(SSH_USER)@$(SSH_HOST):/etc/nginx/sites-available/ $(BACKUP_DIR)/nginx/
	@echo "==> Архивирование..."
	tar -czf $(BACKUP_ARCHIVE) -C backups $(notdir $(BACKUP_DIR))
	rm -rf $(BACKUP_DIR)
	@echo "==> Бэкап сохранён: $(BACKUP_ARCHIVE)"

.PHONY: deploy
deploy: ci
	ssh $(SSH_USER)@$(SSH_HOST) "\
		cd /app/server && \
		npm install && \
		npx prisma migrate deploy && \
		npx prisma generate && \
		pm2 restart panda-api 2>/dev/null || pm2 start server.js --name panda-api && \
		cd /app/client && \
		npm install && \
		npm run build \
	"
