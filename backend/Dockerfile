FROM python:slim

WORKDIR /project
RUN apt-get update && \
	apt-get install -y gcc ffmpeg libsm6 libxext6

WORKDIR /project

RUN python -m pip --no-cache-dir install pdm

COPY src/api /project/api

COPY pyproject.toml pdm.lock .env /project/

RUN pdm install --frozen-lockfile --no-editable -vv

EXPOSE 8000

ENTRYPOINT ["pdm", "run", "--", "python", "-m", "uvicorn", "api.main:app", "--host", "0.0.0.0", "--port", "8000"]
CMD []
