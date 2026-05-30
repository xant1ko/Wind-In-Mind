WEB_DIR=web
API_DIR=api
DEV_TOOLS_DIR=dev-tools


# --- web ---

.PHONY: start_web
start_web:
	cd $(WEB_DIR); npm i; npm run dev $(ARGS)

.PHONY: start_api
start_api:
	cd $(API_DIR); npm i; npm run start:dev $(ARGS)

.PHONY: start_dev_db
start_dev_db:
	cd $(DEV_TOOLS_DIR); ./docker-mongodb.sh $(ARGS)

.PHONY: entity-export-tasks
entity-export-tasks:
	nodejs $(DEV_TOOLS_DIR)/exporters/task-exporter.ts $(ARGS)

.PHONY: docker-web-dev-build
docker-web-dev-build:
	docker build --target development -t frontend:dev -f Dockerfile.frontend .

.PHONY: start-docker-web-dev
start-docker-web-dev:
	docker run -d -p 3000:3000 -v "$(pwd)/web/src:/app/src" --name wind-in-mind-web frontend:dev

# TODO Нахуй, в пизду
# .PHONY: dev-db-backup
# dev-db-backup:
# 	cd $(DEV_TOOLS_DIR); mongodump  $(ARGS)