import json
from google import genai
from config import GEMINI_API_KEY

# Initialize Gemini Client
client = genai.Client(api_key=GEMINI_API_KEY)


def generate_travel_plan(request):
    prompt = f"""
You are VoyageAI, an expert AI Travel Planner.

Your task is to generate a COMPLETE personalized travel package.

STRICT RULES

1. Return ONLY valid JSON.
2. Do NOT use Markdown.
3. Do NOT write explanations.
4. Do NOT wrap inside ```json.
5. Every field MUST be filled.
6. Keep recommendations realistic.
7. Budget should closely match the user's budget.
8. Attractions and restaurants should actually exist.
9. Weather should match the travel season.
10. Keep descriptions concise (1-3 sentences).

Gallery Rules

- gallery MUST contain 6 scenic places or landmarks.
- Do NOT leave gallery empty.
- Use real places from the destination.
- Return only place names as strings.
- These places should be suitable for displaying photos.
AI Insights Rules

- Generate 3-5 useful personalized travel insights.
- Do not leave ai_insights empty.
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

Trip Details

Starting City:
{request.from_city}

Destination:
{request.destination}

Travel Dates:
{request.start_date} to {request.end_date}

Budget:
₹{request.budget}

Travelers:
{request.travelers}

Travel Style:
{request.travel_style}

Accommodation:
{request.accommodation}

Food Preference:
{request.food_preference}

Extra Preferences:
{request.preferences}
"""

    try:
      response = client.models.generate_content(
          model="gemini-3.6-flash",
          contents=prompt,
      )

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
      travel_plan = json.loads(text)

      # ---------- Gallery Fallback ----------
      if not travel_plan.get("gallery"):
          travel_plan["gallery"] = [
              attraction.get("name", "")
              for attraction in travel_plan.get("attractions", [])
              if attraction.get("name")
          ]

      # Ensure at least 6 gallery items
      while len(travel_plan["gallery"]) < 6:
          travel_plan["gallery"].append(request.destination)

      # ---------- Packing List Fallback ----------
      if not travel_plan.get("packing_list"):
          travel_plan["packing_list"] = [
              "Comfortable walking shoes",
              "Water bottle",
              "Power bank",
              "ID proof",
              "Phone charger",]
    

      # ---------- AI Insights Fallback ----------
      if not travel_plan.get("ai_insights"):
          travel_plan["ai_insights"] = [
              f"Best time to explore {request.destination} is during the early morning.",
              "Book hotels and transport in advance for better prices.",
              "Keep some cash along with digital payment methods.",
          ]

      # ---------- Tips Fallback ----------
      if not travel_plan.get("tips"):
          travel_plan["tips"] = [
              "Carry a reusable water bottle.",
              "Keep emergency contacts handy.",
              "Check the weather forecast before heading out."
          ]

# Uncomment while debugging
# print(json.dumps(travel_plan, indent=2))

      return travel_plan

    except json.JSONDecodeError as e:
        return {
            "error": "Gemini returned invalid JSON.",
            "details": str(e),
            "raw_response": text if "text" in locals() else None
        }

    except Exception as e:
        return {
            "error": str(e),
            "raw_response": text if "text" in locals() else None
        }