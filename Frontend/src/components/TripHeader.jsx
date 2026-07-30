import { MapPin, Calendar, Users, Wallet } from "lucide-react";

const TripHeader = ({
  destination,
  summary,
  startDate,
  endDate,
  travelers,
  budget,
}) => {
  return (
    <div className="bg-gradient-to-r from-cyan-500 to-blue-600 rounded-3xl p-8 text-white shadow-xl mb-8">

      {/* Destination */}
      <div className="flex items-center gap-3">
        <MapPin size={36} />
        <h1 className="text-4xl font-bold">{destination}</h1>
      </div>

      {/* Summary */}
      <p className="mt-4 text-lg text-cyan-100">
        {summary}
      </p>

      {/* Trip Info */}
      <div className="grid md:grid-cols-3 gap-6 mt-8">

        {/* Travel Dates */}
        <div className="bg-white/10 rounded-xl p-5 backdrop-blur">
          <div className="flex items-center gap-2 mb-3">
            <Calendar size={20} />
            <span className="font-semibold text-lg">Travel Dates</span>
          </div>

          <p className="text-lg font-medium">
            {startDate} - {endDate}
          </p>
        </div>

        {/* Travelers */}
        <div className="bg-white/10 rounded-xl p-5 backdrop-blur">
          <div className="flex items-center gap-2 mb-3">
            <Users size={20} />
            <span className="font-semibold text-lg">Travelers</span>
          </div>

          <p className="text-lg font-medium">
            {travelers}
          </p>
        </div>

        {/* Budget */}
        <div className="bg-white/10 rounded-xl p-5 backdrop-blur">
          <div className="flex items-center gap-2 mb-3">
            <Wallet size={20} />
            <span className="font-semibold text-lg">Budget</span>
          </div>

          <p className="text-lg font-medium">
            ₹{budget}
          </p>
        </div>

      </div>
    </div>
  );
};

export default TripHeader;