WEB_DIR=web
API_DIR=api



# --- web ---

.PHONY: start_web
start_web:
	cd $(WEB_DIR); npm i; npm run dev $(ARGS)

.PHONY: start_api
start_api:
	cd $(API_DIR); npm i; npm run start:dev $(ARGS)
