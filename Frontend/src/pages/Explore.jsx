import { useEffect, useState } from "react";
import AttractionsGrid from "../components/AttractionsGrid";
import HiddenGems from "../components/HiddenGems";
const Explore = () => {
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
        Loading attractions...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white px-6 py-10">
      <div className="max-w-7xl mx-auto">

        <h1 className="text-4xl font-bold mb-2">
          🗺 Explore Lonavala
        </h1>

        <p className="text-gray-400 mb-8">
          Discover the best attractions recommended for your trip.
        </p>

        <AttractionsGrid attractions={trip.attractions} />
        <HiddenGems gems={trip.hidden_gems} />

      </div>
    </div>
  );
};

export default Explore;