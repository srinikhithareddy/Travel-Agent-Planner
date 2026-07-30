from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from models.travel_request import TravelRequest
from models.travel_response import TravelResponse

from services.gemini_service import generate_travel_plan

app = FastAPI(
    title="TravelAI API",
    version="1.0.0"
)

# Allow React Frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {
        "message": "Welcome to TravelAI API"
    }

@app.post("/generate-trip")
def generate_trip(request: TravelRequest):
    return generate_travel_plan(request)