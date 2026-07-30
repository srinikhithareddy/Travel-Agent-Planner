import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import {
  Plane,
  MapPin,
  Wallet,
  Users,
  CalendarDays,
} from "lucide-react";

export default function TravelForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    from: "",
    destination: "",
    startDate: "",
    endDate: "",
    budget: "",
    travelers: "",
    travelStyle: "",
    accommodation: "",
    foodPreference: "",
    preferences: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

    const handleSubmit = async () => {
  if (
    !formData.from ||
    !formData.destination ||
    !formData.startDate ||
    !formData.endDate ||
    !formData.budget ||
    !formData.travelers
  ) {
    alert("Please fill all required fields.");
    return;
  }

  try {
    navigate("/loading");

    const response = await fetch("http://127.0.0.1:8000/generate-trip", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from_city: formData.from,
        destination: formData.destination,
        start_date: formData.startDate,
        end_date: formData.endDate,
        budget: Number(formData.budget),
        travelers: Number(formData.travelers),
        travel_style: formData.travelStyle,
        accommodation: formData.accommodation,
        food_preference: formData.foodPreference,
        preferences: formData.preferences,
      }),
    });

    console.log("Status:", response.status);

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const result = await response.json();

    console.log("Backend Response:", result);

    const finalTrip = {
  ...result,

  from_city: formData.from,
  destination: formData.destination,

  start_date: formData.startDate,
  end_date: formData.endDate,

  travelers: Number(formData.travelers),
  total_budget: Number(formData.budget),

  travel_style: formData.travelStyle,
  accommodation: formData.accommodation,
  food_preference: formData.foodPreference,
};

localStorage.setItem("tripResult", JSON.stringify(finalTrip));
    console.log("Saved:", localStorage.getItem("tripResult"));

    navigate("/result");
  } catch (err) {
    console.error(err);
    alert("Failed to generate trip.");
  }
};

  return (
    <Card className="bg-[#111111] border border-gray-800 rounded-3xl shadow-2xl">
      <CardContent className="p-10">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-white">
            Plan Your Journey
          </h2>

          <p className="text-gray-400 mt-3">
            Fill your travel details and let AI create the perfect itinerary.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* From */}
          <div className="relative">
            <Plane
              className="absolute left-4 top-4 text-cyan-400"
              size={20}
            />

            <input
              type="text"
              name="from"
              placeholder="From"
              value={formData.from}
              onChange={handleChange}
              className="w-full pl-12 pr-4 py-4 rounded-xl bg-[#1b1b1b] border border-gray-700 text-white placeholder-gray-500 focus:ring-2 focus:ring-cyan-500 outline-none"
            />
          </div>

          {/* Destination */}
          <div className="relative">
            <MapPin
              className="absolute left-4 top-4 text-cyan-400"
              size={20}
            />

            <input
              type="text"
              name="destination"
              placeholder="Destination"
              value={formData.destination}
              onChange={handleChange}
              className="w-full pl-12 pr-4 py-4 rounded-xl bg-[#1b1b1b] border border-gray-700 text-white placeholder-gray-500 focus:ring-2 focus:ring-cyan-500 outline-none"
            />
          </div>

          {/* Start Date */}
          <div className="relative">
            <CalendarDays
              className="absolute left-4 top-4 text-cyan-400"
              size={20}
            />

            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="w-full pl-12 pr-4 py-4 rounded-xl bg-[#1b1b1b] border border-gray-700 text-white focus:ring-2 focus:ring-cyan-500 outline-none"
            />
          </div>

          {/* End Date */}
          <div className="relative">
            <CalendarDays
              className="absolute left-4 top-4 text-cyan-400"
              size={20}
            />

            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              className="w-full pl-12 pr-4 py-4 rounded-xl bg-[#1b1b1b] border border-gray-700 text-white focus:ring-2 focus:ring-cyan-500 outline-none"
            />
          </div>

          {/* Budget */}
          <div className="relative">
            <Wallet
              className="absolute left-4 top-4 text-cyan-400"
              size={20}
            />

            <input
              type="number"
              name="budget"
              placeholder="Budget"
              value={formData.budget}
              onChange={handleChange}
              className="w-full pl-12 pr-4 py-4 rounded-xl bg-[#1b1b1b] border border-gray-700 text-white placeholder-gray-500 focus:ring-2 focus:ring-cyan-500 outline-none"
            />
          </div>

          {/* Travelers */}
          <div className="relative">
            <Users
              className="absolute left-4 top-4 text-cyan-400"
              size={20}
            />

            <input
              type="number"
              name="travelers"
              placeholder="Number of Travelers"
              value={formData.travelers}
              onChange={handleChange}
              className="w-full pl-12 pr-4 py-4 rounded-xl bg-[#1b1b1b] border border-gray-700 text-white placeholder-gray-500 focus:ring-2 focus:ring-cyan-500 outline-none"
            />
          </div>
        </div>

        {/* Travel Style */}
        <div className="mt-8">
          <label className="block text-white mb-2 font-semibold">
            Travel Style
          </label>

          <select
            name="travelStyle"
            value={formData.travelStyle}
            onChange={handleChange}
            className="w-full p-4 rounded-xl bg-[#1b1b1b] border border-gray-700 text-white"
          >
            <option value="">Select Travel Style</option>
            <option>Adventure</option>
            <option>Luxury</option>
            <option>Family</option>
            <option>Solo</option>
            <option>Business</option>
            <option>Budget</option>
          </select>
        </div>

        {/* Accommodation */}
        <div className="mt-8">
          <label className="block text-white mb-2 font-semibold">
            Accommodation
          </label>

          <select
            name="accommodation"
            value={formData.accommodation}
            onChange={handleChange}
            className="w-full p-4 rounded-xl bg-[#1b1b1b] border border-gray-700 text-white"
          >
            <option value="">Choose Accommodation</option>
            <option>Hotel</option>
            <option>Resort</option>
            <option>Hostel</option>
            <option>Airbnb</option>
          </select>
        </div>

        {/* Food Preference */}
        <div className="mt-8">
          <label className="block text-white mb-2 font-semibold">
            Food Preference
          </label>

          <select
            name="foodPreference"
            value={formData.foodPreference}
            onChange={handleChange}
            className="w-full p-4 rounded-xl bg-[#1b1b1b] border border-gray-700 text-white"
          >
            <option value="">Choose Food Preference</option>
            <option>Vegetarian</option>
            <option>Vegan</option>
            <option>Non-Vegetarian</option>
            <option>No Preference</option>
          </select>
        </div>

        {/* Preferences */}
        <div className="mt-8">
          <label className="block text-white mb-2 font-semibold">
            Additional Preferences
          </label>

          <textarea
            rows="4"
            name="preferences"
            value={formData.preferences}
            onChange={handleChange}
            placeholder="Beach View Hotel, Adventure Sports, Wheelchair Accessible..."
            className="w-full p-4 rounded-xl bg-[#1b1b1b] border border-gray-700 text-white placeholder-gray-500 resize-none focus:ring-2 focus:ring-cyan-500 outline-none"
          />
        </div>

        {/* Button */}
        <button
          onClick={handleSubmit}
          className="mt-10 w-full py-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 transition-all duration-300 text-black font-bold text-lg shadow-lg hover:shadow-cyan-500/30"
        >
          ✨ Generate AI Travel Plan
        </button>
      </CardContent>
    </Card>
  );
}