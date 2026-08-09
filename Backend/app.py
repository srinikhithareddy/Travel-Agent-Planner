from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from models.travel_request import TravelRequest
from models.travel_response import TravelResponse

from services.gemini_service import generate_travel_plan
from database import db

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
    print(f"Received request: {request}")

    result = generate_travel_plan(request)
    print(f"Travel plan result: {result}")

    if "error" in result:
        print(f"Error in result: {result}")
        raise HTTPException(
            status_code=500,
            detail=result
        )

    # Save trip to database
    try:
        trip_id = db.save_trip(request.dict(), result)
        result["trip_id"] = trip_id
    except Exception as e:
        # Log error but don't fail the request if database save fails
        print(f"Database save error: {e}")

    return result


@app.get("/trips")
def get_all_trips():
    """Get all saved trips"""
    try:
        trips = db.get_all_trips()
        return {"trips": trips}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/trips/{trip_id}")
def get_trip(trip_id: int):
    """Get a specific trip by ID"""
    try:
        trip = db.get_trip(trip_id)
        if not trip:
            raise HTTPException(status_code=404, detail="Trip not found")
        return trip
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.delete("/trips/{trip_id}")
def delete_trip(trip_id: int):
    """Delete a trip by ID"""
    try:
        success = db.delete_trip(trip_id)
        if not success:
            raise HTTPException(status_code=404, detail="Trip not found")
        return {"message": "Trip deleted successfully"}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))