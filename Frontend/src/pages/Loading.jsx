import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Loading() {
  const navigate = useNavigate();
  const [status, setStatus] = useState("Connecting to AI...");

  useEffect(() => {
    // Check if we're actually generating a trip
    const isGenerating = sessionStorage.getItem("generatingTrip");
    if (!isGenerating) {
      // If not generating, redirect to planner
      navigate("/planner");
      return;
    }

    // Poll for trip result in localStorage
    const checkTripResult = () => {
      const storedTrip = localStorage.getItem("tripResult");
      if (storedTrip) {
        try {
          const trip = JSON.parse(storedTrip);
          if (trip && trip.destination) {
            setStatus("Complete!");
            sessionStorage.removeItem("generatingTrip");
            setTimeout(() => navigate("/result"), 500);
            return true;
          }
        } catch (e) {
          console.error("Error parsing stored trip:", e);
        }
      }
      return false;
    };

    // Simulate loading states for better UX
    const loadingStates = [
      "Connecting to AI...",
      "Analyzing your preferences...",
      "Searching destinations...",
      "Planning itinerary...",
      "Finalizing your trip..."
    ];

    let stateIndex = 0;
    
    // Update status messages
    const statusInterval = setInterval(() => {
      if (stateIndex < loadingStates.length) {
        setStatus(loadingStates[stateIndex]);
        stateIndex++;
      }
    }, 1500);

    // Poll for trip result every 500ms
    const checkInterval = setInterval(() => {
      if (checkTripResult()) {
        clearInterval(statusInterval);
        clearInterval(checkInterval);
      }
    }, 500);

    // Timeout after 60 seconds (increased from 30)
    const timeout = setTimeout(() => {
      clearInterval(statusInterval);
      clearInterval(checkInterval);
      setStatus("Taking longer than expected...");
      
      // Final check before redirecting
      if (!checkTripResult()) {
        sessionStorage.removeItem("generatingTrip");
        setStatus("No trip found. Redirecting...");
        setTimeout(() => navigate("/planner"), 2000);
      }
    }, 60000);

    return () => {
      clearInterval(statusInterval);
      clearInterval(checkInterval);
      clearTimeout(timeout);
    };
  }, [navigate]);

  return (
    <div className="bg-black min-h-screen flex flex-col items-center justify-center text-white">
      <div className="text-center">
        <div className="text-4xl font-bold mb-4">✈️ VoyageAI</div>
        <div className="text-2xl text-cyan-400">{status}</div>
        <div className="mt-8">
          <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
        </div>
        <p className="text-gray-400 mt-4 text-sm">Please wait while we generate your perfect trip...</p>
      </div>
    </div>
  );
}