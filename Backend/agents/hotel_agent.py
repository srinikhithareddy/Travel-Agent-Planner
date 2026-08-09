"""
Hotel Agent - Specialized in accommodation recommendations
"""

import json
import google.generativeai as genai
from config import GEMINI_API_KEY
from utils.prompts import HOTEL_AGENT_PROMPT

genai.configure(api_key=GEMINI_API_KEY)


class HotelAgent:
    def __init__(self):
        self.model = genai.GenerativeModel('gemini-3.6-flash')
    
    def get_hotel_recommendation(self, destination, budget, accommodation, travelers, travel_style):
        """Get hotel recommendation based on preferences"""
        prompt = HOTEL_AGENT_PROMPT.format(
            destination=destination,
            budget=budget,
            accommodation=accommodation,
            travelers=travelers,
            travel_style=travel_style
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


def get_hotel(destination, budget, accommodation, travelers, travel_style):
    """Factory function to get hotel recommendation"""
    agent = HotelAgent()
    return agent.get_hotel_recommendation(destination, budget, accommodation, travelers, travel_style)
