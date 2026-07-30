import json
from google import genai
from config import GEMINI_API_KEY

# Initialize Gemini Client
client = genai.Client(api_key=GEMINI_API_KEY)


def generate_travel_plan(request):
    prompt = f"""
You are an expert AI Travel Planner.

Generate a personalized travel plan.

IMPORTANT RULES:
1. Return ONLY valid JSON.
2. Do NOT use markdown.
3. Do NOT wrap the JSON inside ```json.
4. Do NOT write explanations.
5. Do NOT leave any field empty.
6. Generate realistic hotels, restaurants, attractions and itinerary.
7. Budget must approximately match the user's budget.

Return this exact JSON format:

{{
  "destination": "",
  "summary": "",

  "weather": {{
    "temperature": "",
    "condition": "",
    "humidity": "",
    "wind": ""
  }},

  "hotel": {{
    "name": "",
    "location": "",
    "rating": "",
    "price": "",
    "amenities": []
  }},

  "attractions": [
    {{
      "name": "",
      "location": "",
      "rating": "",
      "description": ""
    }}
  ],

  "restaurants": [
    {{
      "name": "",
      "cuisine": "",
      "rating": "",
      "price": ""
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
    "misc": ""
  }},

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

        # Remove markdown if Gemini accidentally returns it
        text = text.replace("```json", "")
        text = text.replace("```", "")
        text = text.strip()

        travel_plan = json.loads(text)

        return travel_plan

    except json.JSONDecodeError:
        return {
            "error": "Gemini returned invalid JSON.",
            "raw_response": text
        }

    except Exception as e:
        return {
            "error": str(e)
        }