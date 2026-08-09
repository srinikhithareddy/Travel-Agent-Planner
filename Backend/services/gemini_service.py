"""
Gemini Service - Main service for travel plan generation
Now uses the Manager Agent for orchestration
"""

from agents.manager import create_travel_plan


def generate_travel_plan(request):
    """
    Generate a complete travel plan using the Manager Agent
    The Manager Agent coordinates all specialized agents
    """
    return create_travel_plan(request)