"""
Budget Agent - Specialized in travel budget planning and breakdowns
"""

import json
import google.generativeai as genai
from config import GEMINI_API_KEY
from utils.prompts import BUDGET_AGENT_PROMPT
from datetime import datetime

genai.configure(api_key=GEMINI_API_KEY)


class BudgetAgent:
    def __init__(self):
        self.model = genai.GenerativeModel('gemini-3.6-flash')
    
    def get_budget_breakdown(self, budget, destination, travelers, start_date, end_date):
        """Get detailed budget breakdown"""
        # Calculate duration in days
        start = datetime.strptime(start_date, "%Y-%m-%d")
        end = datetime.strptime(end_date, "%Y-%m-%d")
        duration = (end - start).days + 1
        
        prompt = BUDGET_AGENT_PROMPT.format(
            budget=budget,
            destination=destination,
            travelers=travelers,
            duration=duration
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


def get_budget(budget, destination, travelers, start_date, end_date):
    """Factory function to get budget breakdown"""
    agent = BudgetAgent()
    return agent.get_budget_breakdown(budget, destination, travelers, start_date, end_date)
