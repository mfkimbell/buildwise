# STL
import re

# PDM
import requests
from fastapi import FastAPI, Request, APIRouter
from fastapi.middleware.cors import CORSMiddleware
from openai import OpenAI
import os
from dotenv import load_dotenv

# initialization
load_dotenv()
client = OpenAI(api_key="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")
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

@app.post("/api/testgpt")
async def test_gpt(request: Request):
    request_json = await request.json()  # Parse JSON body
    user_input = request_json["data"]  # Extract the user input from the JSON

    completion = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {
                "role": "system",
                "content": "You are a programming devops expert",
            },
            {
                "role": "user",
                "content": user_input,  # Use the extracted user input
            },
        ],
    )

    text = completion.choices[0].message  # Extract the text from the completion
    return {"text": text}
