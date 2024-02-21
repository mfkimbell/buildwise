
# STL
import re

# PDM
import requests
from fastapi import FastAPI, Request, APIRouter
from fastapi.middleware.cors import CORSMiddleware
from .spotify.ImageStitch import *

# from starlette.responses import FileResponse
# from api.spotify.SpotifyClient import SpotifyClient


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Allows all origins for localhost:3000
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

print("main.py running")


@app.get("/")
async def read_root():
    return {"Hello": "World"}


@app.post("/api/parse")
async def github_gpt4(request: Request):

    return "hi"
