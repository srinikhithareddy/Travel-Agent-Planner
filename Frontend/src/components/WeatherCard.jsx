import { CloudSun, Thermometer, Droplets, Wind } from "lucide-react";

const WeatherCard = ({ weather }) => {
  if (!weather) return null;

  return (
    <div className="bg-[#111827] border border-gray-700 rounded-2xl p-6 shadow-lg">
      <div className="flex items-center gap-3 mb-6">
        <CloudSun className="text-yellow-400" size={30} />
        <h2 className="text-2xl font-bold text-white">
          Weather Forecast
        </h2>
      </div>

      <div className="grid md:grid-cols-4 gap-5">

        <div className="bg-[#1f2937] rounded-xl p-4 text-center">
          <Thermometer
            size={30}
            className="mx-auto text-red-400 mb-3"
          />
          <p className="text-gray-400">Temperature</p>
          <h3 className="text-xl font-bold text-white">
            {weather.temperature}
          </h3>
        </div>

        <div className="bg-[#1f2937] rounded-xl p-4 text-center">
          <CloudSun
            size={30}
            className="mx-auto text-yellow-400 mb-3"
          />
          <p className="text-gray-400">Condition</p>
          <h3 className="text-xl font-bold text-white">
            {weather.condition}
          </h3>
        </div>

        <div className="bg-[#1f2937] rounded-xl p-4 text-center">
          <Droplets
            size={30}
            className="mx-auto text-cyan-400 mb-3"
          />
          <p className="text-gray-400">Humidity</p>
          <h3 className="text-xl font-bold text-white">
            {weather.humidity}
          </h3>
        </div>

        <div className="bg-[#1f2937] rounded-xl p-4 text-center">
          <Wind
            size={30}
            className="mx-auto text-green-400 mb-3"
          />
          <p className="text-gray-400">Wind</p>
          <h3 className="text-xl font-bold text-white">
            {weather.wind}
          </h3>
        </div>

      </div>

      <div className="mt-6 bg-cyan-900/20 border border-cyan-500 rounded-xl p-4">
        <p className="text-cyan-300 font-semibold">
          AI Recommendation
        </p>

        <p className="text-gray-300 mt-2">
          Weather looks suitable for sightseeing. Carry comfortable
          clothes, sunscreen, and stay hydrated while exploring.
        </p>
      </div>
    </div>
  );
};

export default WeatherCard;