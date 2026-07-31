import { useEffect, useState } from "react";
import RestaurantsGrid from "../components/RestaurantsGrid";
import LocalFood from "../components/LocalFood";
const Food = () => {
  const [trip, setTrip] = useState(null);

  useEffect(() => {
    const storedTrip = localStorage.getItem("tripResult");

    if (storedTrip) {
      setTrip(JSON.parse(storedTrip));
    }
  }, []);

  if (!trip) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white">
        Loading restaurants...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white px-6 py-10">
      <div className="max-w-7xl mx-auto">

        <h1 className="text-4xl font-bold mb-2">
          🍽 Food Guide
        </h1>

        <p className="text-gray-400 mb-8">
          AI-recommended restaurants and local cuisine.
        </p>

        <RestaurantsGrid restaurants={trip.restaurants} />
        <LocalFood foods={trip.local_food} />

      </div>
    </div>
  );
};

export default Food;