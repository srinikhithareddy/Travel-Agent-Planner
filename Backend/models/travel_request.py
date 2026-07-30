from pydantic import BaseModel

class TravelRequest(BaseModel):
    from_city: str
    destination: str
    start_date: str
    end_date: str
    budget: int
    travelers: int
    travel_style: str
    accommodation: str
    food_preference: str
    preferences: str