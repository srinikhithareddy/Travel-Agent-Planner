from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from models.travel_request import TravelRequest
from models.travel_response import TravelResponse

from services.gemini_service import generate_travel_plan

app = FastAPI(
    title="VoyageAI API",
    version="2.0.0",
    description="AI-powered Multi-Agent Travel Planner"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {
        "status": "running",
        "message": "VoyageAI Backend is Running 🚀"
    }


@app.post(
    "/generate-trip",
    response_model=TravelResponse,
    response_model_exclude_none=True,
)
def generate_trip(request: TravelRequest):

    result = generate_travel_plan(request)

    if "error" in result:
        raise HTTPException(
            status_code=500,
            detail=result
        )

    return result