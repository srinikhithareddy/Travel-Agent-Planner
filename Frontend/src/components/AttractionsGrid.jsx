import { MapPin, Star } from "lucide-react";

const AttractionsGrid = ({ attractions }) => {
  if (!attractions || attractions.length === 0) return null;

  return (
    <div className="bg-[#111827] border border-gray-700 rounded-2xl p-6 shadow-lg mt-8">
      <div className="flex items-center gap-3 mb-6">
        <MapPin className="text-cyan-400" size={30} />
        <h2 className="text-2xl font-bold text-white">
          Top Attractions
        </h2>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {attractions.map((place, index) => (
          <div
            key={index}
            className="bg-[#1f2937] rounded-xl p-5 border border-gray-700 hover:border-cyan-500 transition-all duration-300 hover:scale-105"
          >
            <h3 className="text-xl font-bold text-white">
              {place.name}
            </h3>

            <div className="flex items-center gap-2 mt-3 text-gray-300">
              <MapPin size={16} />
              <span>{place.location}</span>
            </div>

            <div className="flex items-center gap-2 mt-2 text-yellow-400">
              <Star size={16} fill="currentColor" />
              <span>{place.rating}</span>
            </div>

            <p className="mt-4 text-gray-400 leading-relaxed">
              {place.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AttractionsGrid;