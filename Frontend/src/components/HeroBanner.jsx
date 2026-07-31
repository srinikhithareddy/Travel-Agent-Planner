const HeroBanner = ({ trip }) => {
  return (
    <div className="relative overflow-hidden rounded-3xl p-10 bg-gradient-to-r from-cyan-600 via-blue-700 to-indigo-900 mt-8">

      <p className="uppercase tracking-widest text-cyan-100 text-sm mb-3">
        AI Personalized Journey
      </p>

      <h1 className="text-5xl font-bold mb-5">
        {trip.destination}
      </h1>

      <p className="text-lg text-cyan-50 leading-8 max-w-4xl">
        {trip.summary}
      </p>

      <div className="flex flex-wrap gap-4 mt-8">

        <div className="bg-white/10 px-5 py-3 rounded-full">
          📅 {trip.start_date} → {trip.end_date}
        </div>

        <div className="bg-white/10 px-5 py-3 rounded-full">
          👤 {trip.travelers} Traveler
        </div>

        <div className="bg-white/10 px-5 py-3 rounded-full">
          💰 ₹{trip.total_budget}
        </div>

      </div>

    </div>
  );
};

export default HeroBanner;