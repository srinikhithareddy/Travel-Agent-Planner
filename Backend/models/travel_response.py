from typing import List
from pydantic import BaseModel


# ---------------- WEATHER ---------------- #

class Weather(BaseModel):
    temperature: str
    condition: str
    humidity: str
    wind: str


# ---------------- HOTEL ---------------- #

class Hotel(BaseModel):
    name: str
    location: str
    rating: str
    price: str
    amenities: List[str]


# ---------------- ATTRACTIONS ---------------- #

class Attraction(BaseModel):
    name: str
    location: str
    rating: str
    description: str


# ---------------- RESTAURANTS ---------------- #

class Restaurant(BaseModel):
    name: str
    cuisine: str
    rating: str
    price: str


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


# ---------------- RESPONSE ---------------- #

class TravelResponse(BaseModel):

    destination: str

    summary: str

    weather: Weather

    hotel: Hotel

    attractions: List[Attraction]

    restaurants: List[Restaurant]

    itinerary: List[ItineraryDay]

    budget: Budget

    tips: List[str]