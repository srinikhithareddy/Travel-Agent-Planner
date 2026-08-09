import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import TravelTips from "../components/TravelTips";
import EmergencyCard from "../components/EmergencyCard";
import PackingList from "../components/PackingList";
import DailyWeather from "../components/DailyWeather";
const Essentials = () => {
  const [trip, setTrip] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedTrip = localStorage.getItem("tripResult");

    if (storedTrip) {
      setTrip(JSON.parse(storedTrip));
    }
  }, []);

  if (!trip) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white">
        Loading travel essentials...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white px-6 py-10">
      <div className="max-w-7xl mx-auto">

        <button
          onClick={() => navigate("/result")}
          className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition"
        >
          <ArrowLeft size={20} />
          Back to Dashboard
        </button>

        <h1 className="text-4xl font-bold mb-2">
          🎒 Travel Essentials
        </h1>

        <p className="text-gray-400 mb-8">
          Important travel tips and recommendations.
        </p>

        <TravelTips tips={trip.tips} />
        <PackingList items={trip.packing_list} />

        <EmergencyCard emergency={trip.emergency} />

        <DailyWeather forecast={trip.daily_weather} />

      </div>
    </div>
  );
};

export default Essentials;