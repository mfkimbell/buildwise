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
api_key = os.getenv("OPENAI_API_KEY")
client = OpenAI(api_key=api_key)
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
    adv_user_input = (
        user_input + " Additionally, "
        "These results are intended to create a visual map for project architecture so the user can better understand how the project interacts. "
        "The format of the results of this query should be json object containing two lists as its result. Here is an example of how I want the results of this query to be: "
        '{"initialNodes": [{"id": "react","type": "custom","data": { "label": "React", "imgKey": "react" },"position": { "x": 250, "y": 5 },"isConnectable": true},'
        '{"id": "mongodb","type": "custom","data": { "label": "MongoDB", "imgKey": "mongodb" },"position": { "x": 100, "y": 100 },"isConnectable": true},'
        '{"id": "docker","type": "custom","data": { "label": "Docker", "imgKey": "docker" },"position": { "x": 400, "y": 100 },"isConnectable": true}],'
        '"initialEdges": [{"id": "e1-3","source": "react","target": "docker","type": "customEdge","animated": true,"data": {"connection": "<description about how AWS connects to Kubernetes>"}},'
        '{"id": "e1-6","source": "react","target": "mongodb","type": "customEdge","animated": true,"data": {"connection": "<description about how Kubernetes connects to Docker>"}}]}'
    )

    print("adv user input", adv_user_input)

    completion = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {
                "role": "system",
                "content": "You are a project architecture mapper and devops expert",
            },
            {
                "role": "user",
                "content": adv_user_input,  # Use the extracted user input
            },
        ],
    )

    text = completion.choices[0].message  # Extract the text from the completion
    return {"text": text}
