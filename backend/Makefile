.PHONY: run build up stop remove

run:
	pdm run -- uvicorn src.api.main:app --host 0.0.0.0 --reload

build:
	docker compose build --no-cache

up:
	docker compose up -d

stop:
	docker stop buildwise_backend

remove:
	docker remove buildwise_backend