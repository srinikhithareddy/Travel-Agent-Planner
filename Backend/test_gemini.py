from google import genai
from dotenv import load_dotenv
import os

load_dotenv()

client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)

try:
    response = client.models.generate_content(
        model="gemini-3.6-flash",
        contents="Reply with only the word: SUCCESS"
    )

    print(response.text)

except Exception as e:
    print(type(e).__name__)
    print(e)