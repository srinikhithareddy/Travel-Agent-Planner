"""
Flight Agent - Specialized in flight recommendations and information
"""

import json
import google.generativeai as genai
from config import GEMINI_API_KEY
from utils.prompts import FLIGHT_AGENT_PROMPT

genai.configure(api_key=GEMINI_API_KEY)


class FlightAgent:
    def __init__(self):
        self.model = genai.GenerativeModel('gemini-3.6-flash')
    
    def get_flight_info(self, from_city, destination, start_date, end_date, travelers):
        """Get flight information and recommendations"""
        prompt = FLIGHT_AGENT_PROMPT.format(
            from_city=from_city,
            destination=destination,
            start_date=start_date,
            end_date=end_date,
            travelers=travelers
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


def get_flight(from_city, destination, start_date, end_date, travelers):
    """Factory function to get flight information"""
    agent = FlightAgent()
    return agent.get_flight_info(from_city, destination, start_date, end_date, travelers)
