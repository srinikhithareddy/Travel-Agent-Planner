from typing import List
from pydantic import BaseModel


# ---------------- WEATHER ---------------- #

class Weather(BaseModel):
    temperature: str
    condition: str
    humidity: str
    wind: str


class DailyWeather(BaseModel):
    day: str
    temperature: str
    condition: str


# ---------------- HOTEL ---------------- #

class Hotel(BaseModel):
    name: str
    location: str
    rating: str
    price: str
    description: str
    amenities: List[str]


# ---------------- ATTRACTIONS ---------------- #

class Attraction(BaseModel):
    name: str
    location: str
    rating: str
    description: str
    best_time: str
    duration: str
    entry_fee: str
    crowd_level: str
    photography_rating: str


class HiddenGem(BaseModel):
    name: str
    description: str
    best_time: str
    travel_time: str
    entry_fee: str


# ---------------- RESTAURANTS ---------------- #

class Restaurant(BaseModel):
    name: str
    cuisine: str
    rating: str
    price: str
    speciality: str


class LocalFood(BaseModel):
    dish: str
    description: str


# ---------------- ITINERARY ---------------- #

class ItineraryDay(BaseModel):
    day: int
    title: str
    activities: List[str]


# ---------------- BUDGET ---------------- #

class Budget(BaseModel):
    hotel: str
    food: str
    transport: str
    activities: str
    misc: str
    total: str


# ---------------- TRAVEL SCORE ---------------- #

class TravelScore(BaseModel):
    weather: int
    budget: int
    safety: int
    crowd: int
    scenery: int
    overall: float
    reason: str


# ---------------- EMERGENCY ---------------- #

class Emergency(BaseModel):
    nearest_hospital: str
    police_station: str
    railway_station: str
    bus_station: str
    atm: str


# ---------------- RESPONSE ---------------- #

class TravelResponse(BaseModel):

    destination: str

    summary: str

    hero_description: str

    weather: Weather

    daily_weather: List[DailyWeather]

    hotel: Hotel

    attractions: List[Attraction]

    hidden_gems: List[HiddenGem]

    restaurants: List[Restaurant]

    local_food: List[LocalFood]

    itinerary: List[ItineraryDay]

    budget: Budget

    packing_list: List[str]

    travel_score: TravelScore

    emergency: Emergency

    gallery: List[str]

    ai_insights: List[str]

    tips: List[str]