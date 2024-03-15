# STL
import re
from typing import Any, Dict

# PDM
import requests
from fastapi import FastAPI, Request, APIRouter
from fastapi.middleware.cors import CORSMiddleware
from fastapi import Body
from openai import OpenAI
import os
from dotenv import load_dotenv
from motor.motor_asyncio import AsyncIOMotorClient

# Test Area
from pymongo.server_api import ServerApi
from pymongo import MongoClient
from bson import ObjectId

from urllib.parse import quote_plus

# initialization
load_dotenv()

MONGO_USER = quote_plus(os.getenv("MONGO_USER"))
MONGO_PASS = quote_plus(os.getenv("MONGO_PASS"))
# MONGODB_URL = f"mongodb://{MONGO_USER}:{MONGO_PASS}@cluster0.0mzfhaf.mongodb.net"
# MONGODB_URL = f"mongodb://{MONGO_USER}:{MONGO_PASS}@cluster0.0mzfhaf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
# print(MONGODB_URL)
DATABASE_NAME = "buildwise_database"
COLLECTION_NAME = "users"

# mongo_client = AsyncIOMotorClient(MONGODB_URL, server_api=ServerApi('1'))
print(f"workdir: {os.getcwd()}")
uri = "mongodb+srv://cluster0.0mzfhaf.mongodb.net/?authSource=%24external&authMechanism=MONGODB-X509&retryWrites=true&w=majority&appName=Cluster0"
mongo_client = MongoClient(
    uri, tls=True, tlsCertificateKeyFile="api/mongocert.pem", server_api=ServerApi("1")
)

db = mongo_client[DATABASE_NAME]
collection = db[COLLECTION_NAME]

document = collection.find_one()
print({"message": "Connected to MongoDB!", "data": document})


api_key = os.getenv("OPENAI_API_KEY")
client = OpenAI(api_key=api_key)
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins for localhost:3000
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

print("main.py running")


@app.get("/")
async def read_root():
    return {"Hello": "World"}


@app.get("/mongo/test")
async def root():
    document = collection.find_one()
    if document is not None:
        document = jsonable_document(document)
    return {"message": "Connected to MongoDB!", "data": document}


def jsonable_document(doc):
    """Convert MongoDB document (including ObjectId) to a JSON-serializable dictionary."""
    if isinstance(doc, dict):
        for key, value in doc.items():
            if isinstance(value, ObjectId):
                doc[key] = str(value)
            elif isinstance(value, dict):
                doc[key] = jsonable_document(value)
    return doc


@app.post("/mongo/{user_id}")
async def post_user_graph(user_id: str, graph_data: Dict[str, Any] = Body(...)):
    # Assume graph_data is already in the desired JSON-like dict format
    graph_data["userID"] = user_id  # Add the user_id to the graph data
    await collection.insert_one(graph_data)
    return {"message": "Graph saved successfully."}


@app.post("/api/testgpt")
async def test_gpt(request: Request):
    request_json = await request.json()  # Parse JSON body
    user_input = request_json["data"]  # Extract the user input from the JSON
    adv_user_input = (
        user_input
        + """Additionally,
        These results are intended to create a visual map for project architecture so the user can better understand how the project interacts. 
        Each node represents a tehnology in the project. Edges represent how the technolgies interact. 
        
        For instance, if a project was containerized by Docker, it would be a child of that node. 
        Same goes for a database connecting to a frontend, or an external API tool connecting to a backend.
        The format of the results of this query should be json object containing two lists as its result. 
        In my example i have the "data" as "<description about how react connects to docker>", however, in your output, I want you to put an actual description about how those tools connect. 
        Here is an example of how I want the results of this query to be, however to be clear, you should only build to tools given above, this is just an exmample for formatting purposes: 
        
        '{"initialNodes": [
            {"id": "1", "type": "custom","data": { "label": "React", "imgKey": "react" },"position": { "x": 250, "y": 5 },"isConnectable": true},'
            '{"id": "2","type": "custom","data": { "label": "MongoDB", "imgKey": "mongodb" },"position": { "x": 100, "y": 100 },"isConnectable": true},'
            '{"id": "3","type": "custom","data": { "label": "Docker", "imgKey": "docker" },"position": { "x": 400, "y": 100 },"isConnectable": true}],'
        '"initialEdges": [
            {"id": "e1-3","source": "1","target": "3","type": "customEdge","animated": true,"data": {"connection": "<description about how react connects to docker>"}},'
            '{"id": "e1-6","source": "1","target": "2","type": "customEdge","animated": true,"data": {"connection": "<description about how react connects to mongodb>"}}]}'
        
        """
    )

    print("adv user input", adv_user_input)

    completion = client.chat.completions.create(
        model="gpt-3.5-turbo",
        # model="gpt-4", //Uncomment this when using gpt4
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
