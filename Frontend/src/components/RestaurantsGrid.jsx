import { UtensilsCrossed, Star, IndianRupee } from "lucide-react";

const RestaurantsGrid = ({ restaurants }) => {
  if (!restaurants || restaurants.length === 0) return null;

  return (
    <div className="bg-[#111827] border border-gray-700 rounded-2xl p-6 shadow-lg mt-8">
      <div className="flex items-center gap-3 mb-6">
        <UtensilsCrossed className="text-orange-400" size={30} />
        <h2 className="text-2xl font-bold text-white">
          Recommended Restaurants
        </h2>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {restaurants.map((restaurant, index) => (
          <div
            key={index}
            className="bg-[#1f2937] border border-gray-700 rounded-xl p-5 hover:border-orange-400 transition-all duration-300 hover:scale-105"
          >
            <h3 className="text-xl font-bold text-white">
              {restaurant.name}
            </h3>

            <p className="text-gray-400 mt-2">
              🍽️ {restaurant.cuisine}
            </p>

            <div className="flex items-center gap-2 mt-4 text-yellow-400">
              <Star size={16} fill="currentColor" />
              <span>{restaurant.rating}</span>
            </div>

            <div className="flex items-center gap-2 mt-3 text-green-400">
              <IndianRupee size={16} />
              <span>{restaurant.price}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RestaurantsGrid;