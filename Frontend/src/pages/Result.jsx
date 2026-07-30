import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";

import TripHeader from "../components/TripHeader";
import WeatherCard from "../components/WeatherCard";
import HotelCard from "../components/HotelCard";
import Timeline from "../components/Timeline";
import AttractionsGrid from "../components/AttractionsGrid";
import RestaurantsGrid from "../components/RestaurantsGrid";
import BudgetCard from "../components/BudgetCard";
import TravelTips from "../components/TravelTips";

const Result = () => {
  const navigate = useNavigate();
  const [trip, setTrip] = useState(null);

  useEffect(() => {
    const storedTrip = localStorage.getItem("tripResult");

    if (storedTrip) {
      setTrip(JSON.parse(storedTrip));
    }
  }, []);

  const handleNewTrip = () => {
    localStorage.removeItem("tripResult");
    navigate("/planner");
  };

  if (!trip) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white">
        <h1 className="text-3xl font-bold mb-4">No Trip Found</h1>

        <p className="text-gray-400 mb-8">
          Generate a travel plan first.
        </p>

        <button
          onClick={() => navigate("/planner")}
          className="bg-cyan-500 hover:bg-cyan-600 px-6 py-3 rounded-xl font-semibold transition"
        >
          Plan a Trip
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white px-6 py-10">
      <div className="max-w-7xl mx-auto">

        {/* Dashboard Header */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">

          <div>
            <h1 className="text-4xl font-bold">
              ✈️ AI Travel Dashboard
            </h1>

            <p className="text-gray-400 mt-2">
              Your personalized AI-generated travel itinerary.
            </p>
          </div>

          <button
            onClick={handleNewTrip}
            className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-600 px-6 py-3 rounded-xl font-semibold transition duration-300 shadow-lg"
          >
            <Plus size={20} />
            Plan Another Trip
          </button>

        </div>

        <TripHeader
          destination={trip.destination}
          summary={trip.summary}
          startDate={trip.start_date}
          endDate={trip.end_date}
          travelers={trip.travelers}
          budget={trip.total_budget}
        />

        <WeatherCard weather={trip.weather} />

        <HotelCard hotel={trip.hotel} />

        <Timeline itinerary={trip.itinerary} />

        <AttractionsGrid attractions={trip.attractions} />

        <RestaurantsGrid restaurants={trip.restaurants} />

        <BudgetCard budget={trip.budget} />

        <TravelTips tips={trip.tips} />

      </div>
    </div>
  );
};

export default Result;