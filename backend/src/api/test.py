from openai import OpenAI
import os
from dotenv import load_dotenv

load_dotenv()

print("test file \n")

# api_key = "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"

# print("API key: ", api_key)


client = OpenAI(api_key=os.environ.get("OPENAI_API_KEY"))

completion = client.chat.completions.create(
    model="gpt-3.5-turbo",
    messages=[
        {
            "role": "system",
            "content": "You are a programming devops expert",
        },
        {
            "role": "user",
            "content": "Compose a poem that explains the concept of recursion in programming.",
        },
    ],
)

print(completion.choices[0].message)
