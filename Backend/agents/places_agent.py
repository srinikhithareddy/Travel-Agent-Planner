"""
Places Agent - Specialized in attractions and hidden gems recommendations
"""

import json
import google.generativeai as genai
from config import GEMINI_API_KEY
from utils.prompts import PLACES_AGENT_PROMPT

genai.configure(api_key=GEMINI_API_KEY)


class PlacesAgent:
    def __init__(self):
        self.model = genai.GenerativeModel('gemini-3.6-flash')
    
    def get_places_recommendation(self, destination, travel_style, start_date, end_date):
        """Get attractions and hidden gems recommendations"""
        prompt = PLACES_AGENT_PROMPT.format(
            destination=destination,
            travel_style=travel_style,
            start_date=start_date,
            end_date=end_date
        )
        
        try:
            response = self.model.generate_content(prompt)
            
            text = response.text.strip()
            
            # Remove markdown code fences if present
            if text.startswith("```"):
                text = text.split("\n", 1)[1]
            
            if text.endswith("```"):
                text = text.rsplit("```", 1)[0]
            
            text = text.strip()
            
            # Extract JSON object
            start = text.find("{")
            end = text.rfind("}")
            
            if start == -1 or end == -1:
                raise ValueError("No valid JSON object found in response.")
            
            text = text[start:end + 1]
            
            return json.loads(text)
            
        except json.JSONDecodeError as e:
            return {
                "error": "Invalid JSON response",
                "details": str(e)
            }
        except Exception as e:
            return {
                "error": str(e)
            }


def get_places(destination, travel_style, start_date, end_date):
    """Factory function to get places recommendations"""
    agent = PlacesAgent()
    return agent.get_places_recommendation(destination, travel_style, start_date, end_date)
