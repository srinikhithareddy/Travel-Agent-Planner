import { Hotel, MapPin, Star, IndianRupee } from "lucide-react";

const HotelCard = ({ hotel }) => {
  if (!hotel) return null;

  return (
    <div className="bg-[#111827] border border-gray-700 rounded-2xl p-6 shadow-lg mt-8">
      <div className="flex items-center gap-3 mb-6">
        <Hotel className="text-cyan-400" size={30} />
        <h2 className="text-2xl font-bold text-white">
          Recommended Hotel
        </h2>
      </div>

      <div className="grid md:grid-cols-2 gap-8">

        <div>
          <h3 className="text-3xl font-bold text-white">
            {hotel.name}
          </h3>

          <div className="flex items-center gap-2 mt-4 text-gray-300">
            <MapPin size={18} />
            <span>{hotel.location}</span>
          </div>

          <div className="flex items-center gap-2 mt-3 text-yellow-400">
            <Star size={18} fill="currentColor" />
            <span>{hotel.rating}</span>
          </div>

          <div className="flex items-center gap-2 mt-3 text-green-400">
            <IndianRupee size={18} />
            <span>{hotel.price}</span>
          </div>
        </div>

        <div>
          <h4 className="text-xl font-semibold text-white mb-4">
            Amenities
          </h4>

          <div className="flex flex-wrap gap-3">
            {hotel.amenities?.map((item, index) => (
              <span
                key={index}
                className="bg-cyan-600/20 border border-cyan-500 text-cyan-300 px-3 py-2 rounded-full text-sm"
              >
                {item}
              </span>
            ))}
          </div>

          <div className="mt-6 bg-cyan-900/20 border border-cyan-500 rounded-xl p-4">
            <p className="text-cyan-300 font-semibold">
              AI Recommendation
            </p>

            <p className="text-gray-300 mt-2">
              This hotel matches your selected travel style, budget, and
              accommodation preferences while offering a convenient
              location near major attractions.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default HotelCard;