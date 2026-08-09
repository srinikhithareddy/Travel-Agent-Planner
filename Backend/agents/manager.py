"""
Manager Agent - Orchestrates all travel planning agents
Coordinates the workflow between different specialized agents
"""

import json
import google.generativeai as genai
from config import GEMINI_API_KEY
from utils.prompts import MAIN_SYSTEM_PROMPT, TRAVEL_PLAN_TEMPLATE

genai.configure(api_key=GEMINI_API_KEY)


class ManagerAgent:
    def __init__(self):
        self.model = genai.GenerativeModel('gemini-3.6-flash')
    
    def orchestrate_travel_plan(self, request):
        """
        Main orchestration method that coordinates all agents
        For now, this uses the consolidated approach with a single AI call
        but structured to be expanded into true multi-agent system
        """
        
        # Add travel style specific instructions
        travel_style_instructions = ""
        if request.travel_style == "Friends":
            travel_style_instructions = """
TRAVEL STYLE SPECIFIC INSTRUCTIONS - Friends:
- Focus on group activities and experiences suitable for friends
- Recommend nightlife spots, bars, clubs, and entertainment venues
- Include adventure activities that groups can enjoy together
- Suggest restaurants with group seating and sharing platters
- Include party-friendly accommodations and locations
- Recommend photo-worthy spots and Instagrammable locations
- Focus on fun, memorable experiences over relaxation
- Include activities like karaoke, gaming zones, adventure sports
- Suggest local festivals or events happening during travel dates
"""
        elif request.travel_style == "Family":
            travel_style_instructions = """
TRAVEL STYLE SPECIFIC INSTRUCTIONS - Family:
- Focus on family-friendly attractions and activities
- Include kid-friendly restaurants and accommodations
- Suggest educational and fun activities for children
- Consider safety and convenience for families
- Include parks, museums, and family entertainment
"""
        elif request.travel_style == "Solo":
            travel_style_instructions = """
TRAVEL STYLE SPECIFIC INSTRUCTIONS - Solo:
- Focus on solo-friendly activities and experiences
- Include safe accommodations for solo travelers
- Suggest self-guided tours and exploration
- Recommend social spaces where solo travelers can meet others
- Include photography spots and quiet reflection spots
"""
        elif request.travel_style == "Adventure":
            travel_style_instructions = """
TRAVEL STYLE SPECIFIC INSTRUCTIONS - Adventure:
- Focus on adventure activities and outdoor experiences
- Include hiking, trekking, water sports, extreme sports
- Recommend adventure-friendly accommodations
- Suggest off-beat locations and hidden gems
- Include adrenaline-pumping activities
"""
        elif request.travel_style == "Luxury":
            travel_style_instructions = """
TRAVEL STYLE SPECIFIC INSTRUCTIONS - Luxury:
- Focus on premium accommodations and experiences
- Include fine dining restaurants and exclusive experiences
- Recommend luxury spas, resorts, and high-end shopping
- Suggest private tours and VIP experiences
- Include premium transportation options
"""
        elif request.travel_style == "Business":
            travel_style_instructions = """
TRAVEL STYLE SPECIFIC INSTRUCTIONS - Business:
- Focus on business-friendly accommodations with WiFi
- Include quiet workspaces and meeting venues
- Recommend efficient transportation options
- Suggest quick dining options near business areas
- Include networking events and business centers
"""
        elif request.travel_style == "Budget":
            travel_style_instructions = """
TRAVEL STYLE SPECIFIC INSTRUCTIONS - Budget:
- Focus on cost-effective accommodations and activities
- Include free attractions and budget-friendly dining
- Recommend public transportation and walking tours
- Suggest street food and local markets
- Include hostels and budget stays
"""
        
        prompt = f"""
{MAIN_SYSTEM_PROMPT}

{travel_style_instructions}

{TRAVEL_PLAN_TEMPLATE.format(
    from_city=request.from_city,
    destination=request.destination,
    start_date=request.start_date,
    end_date=request.end_date,
    budget=request.budget,
    travelers=request.travelers,
    travel_style=request.travel_style,
    accommodation=request.accommodation,
    food_preference=request.food_preference,
    preferences=request.preferences
)}

Return EXACTLY this JSON:
{{
  "destination": "",
  "summary": "",
  "hero_description": "",
  "weather": {{
    "temperature": "",
    "condition": "",
    "humidity": "",
    "wind": ""
  }},
  "daily_weather": [
    {{
      "day": "",
      "temperature": "",
      "condition": ""
    }}
  ],
  "hotel": {{
    "name": "",
    "location": "",
    "rating": "",
    "price": "",
    "description": "",
    "amenities": []
  }},
  "attractions": [
    {{
      "name": "",
      "location": "",
      "rating": "",
      "description": "",
      "best_time": "",
      "duration": "",
      "entry_fee": "",
      "crowd_level": "",
      "photography_rating": ""
    }}
  ],
  "hidden_gems": [
    {{
      "name": "",
      "description": "",
      "best_time": "",
      "travel_time": "",
      "entry_fee": ""
    }}
  ],
  "restaurants": [
    {{
      "name": "",
      "cuisine": "",
      "rating": "",
      "price": "",
      "speciality": ""
    }}
  ],
  "local_food": [
    {{
      "dish": "",
      "description": ""
    }}
  ],
  "itinerary": [
    {{
      "day": 1,
      "title": "",
      "activities": []
    }}
  ],
  "budget": {{
    "hotel": "",
    "food": "",
    "transport": "",
    "activities": "",
    "misc": "",
    "total": ""
  }},
  "packing_list": [
    "Umbrella",
    "Power Bank",
    "Comfortable Shoes"
  ],
  "travel_score": {{
    "weather": 0,
    "budget": 0,
    "safety": 0,
    "crowd": 0,
    "scenery": 0,
    "overall": 0,
    "reason": ""
  }},

Travel Score Rules:
- weather: Rate 1-5 based on weather conditions during travel dates
- budget: Rate 1-5 based on how well the destination fits the budget
- safety: Rate 1-5 based on general safety of the destination
- crowd: Rate 1-5 based on expected crowd levels (lower is better)
- scenery: Rate 1-5 based on natural beauty and attractions
- overall: Calculate average of all scores, MUST be between 0 and 10
- reason: Brief explanation of the overall score
  "emergency": {{
    "nearest_hospital": "",
    "police_station": "",
    "railway_station": "",
    "bus_station": "",
    "atm": ""
  }},
  "gallery": [
    "Scenic destination name 1",
    "Scenic destination name 2",
    "Scenic destination name 3",
    "Scenic destination name 4",
    "Scenic destination name 5",
    "Scenic destination name 6"
  ],
  "ai_insights": [
    "Insight 1",
    "Insight 2",
    "Insight 3"
  ],
  "tips": []
}}
"""
        
        try:
            response = self.model.generate_content(prompt)
            
            text = response.text.strip()
            
            # Remove markdown code fences if present
            if text.startswith("```"):
                text = text.split("\n", 1)[1]
            
            if text.endswith("```"):
                text = text.rsplit("```", 1)[0]
            
            text = text.strip()
            
            # Extract JSON object if Gemini adds extra text
            start = text.find("{")
            end = text.rfind("}")
            
            if start == -1 or end == -1:
                raise ValueError("No valid JSON object found in Gemini response.")
            
            text = text[start:end + 1]
            
            travel_plan = json.loads(text)
            
            # Apply fallbacks for missing fields
            travel_plan = self._apply_fallbacks(travel_plan, request)
            
            return travel_plan
            
        except json.JSONDecodeError as e:
            return {
                "error": "Invalid JSON response",
                "details": str(e)
            }
        except Exception as e:
            return {
                "error": str(e)
            }
    
    def _apply_fallbacks(self, travel_plan, request):
        """Apply fallback values for missing or empty fields"""
        
        # Gallery fallback
        if not travel_plan.get("gallery"):
            travel_plan["gallery"] = [
                attraction.get("name", "")
                for attraction in travel_plan.get("attractions", [])
                if attraction.get("name")
            ]
        
        while len(travel_plan["gallery"]) < 6:
            travel_plan["gallery"].append(request.destination)
        
        # Packing list fallback
        if not travel_plan.get("packing_list"):
            travel_plan["packing_list"] = [
                "Comfortable walking shoes",
                "Water bottle",
                "Power bank",
                "ID proof",
                "Phone charger",
            ]
        
        # AI insights fallback
        if not travel_plan.get("ai_insights"):
            travel_plan["ai_insights"] = [
                f"Best time to explore {request.destination} is during the early morning.",
                "Book hotels and transport in advance for better prices.",
                "Keep some cash along with digital payment methods.",
            ]
        
        # Tips fallback
        if not travel_plan.get("tips"):
            travel_plan["tips"] = [
                "Carry a reusable water bottle.",
                "Keep emergency contacts handy.",
                "Check the weather forecast before heading out."
            ]
        
        return travel_plan


def create_travel_plan(request):
    """Factory function to create travel plan using manager agent"""
    manager = ManagerAgent()
    return manager.orchestrate_travel_plan(request)
