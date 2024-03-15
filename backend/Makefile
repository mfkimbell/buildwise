.PHONY: run build up stop remove build-force

run:
	pdm run -- uvicorn src.api.main:app --host 0.0.0.0 --reload

build:
	docker compose build

build-force:
	docker compose build --no-cache

up:
	docker compose up -d

stop:
	docker stop buildwise_backend

remove:
	docker remove buildwise_backend
