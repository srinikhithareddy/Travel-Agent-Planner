"""
Weather Agent - Specialized in weather predictions and forecasts
"""

import json
import google.generativeai as genai
from config import GEMINI_API_KEY
from utils.prompts import WEATHER_AGENT_PROMPT

genai.configure(api_key=GEMINI_API_KEY)


class WeatherAgent:
    def __init__(self):
        self.model = genai.GenerativeModel('gemini-3.6-flash')
    
    def get_weather_info(self, destination, start_date, end_date):
        """Get weather information for the destination"""
        prompt = WEATHER_AGENT_PROMPT.format(
            destination=destination,
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


def get_weather(destination, start_date, end_date):
    """Factory function to get weather information"""
    agent = WeatherAgent()
    return agent.get_weather_info(destination, start_date, end_date)
