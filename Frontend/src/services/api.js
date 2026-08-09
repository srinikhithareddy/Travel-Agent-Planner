// Centralized API Service for TravelPlanner

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

/**
 * Generate a travel plan
 * @param {Object} travelData - Travel request data
 * @returns {Promise<Object>} Travel plan response
 */
export const generateTravelPlan = async (travelData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/generate-trip`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(travelData),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.detail || `HTTP Error: ${response.status}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

/**
 * Check API health
 * @returns {Promise<Object>} Health status
 */
export const checkHealth = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/`);
    return await response.json();
  } catch (error) {
    console.error('Health check failed:', error);
    throw error;
  }
};

export default {
  generateTravelPlan,
  checkHealth,
};
