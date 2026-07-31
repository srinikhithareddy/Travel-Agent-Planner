const HiddenGems = ({ gems }) => {
  if (!gems || gems.length === 0) return null;

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 mt-10">

      <h2 className="text-3xl font-bold mb-6">
        🌿 Hidden Gems
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

        {gems.map((gem, index) => (
          <div
            key={index}
            className="bg-zinc-800 rounded-xl p-6 hover:border-green-500 border border-transparent transition"
          >

            <h3 className="text-xl font-semibold">
              {gem.name}
            </h3>

            <p className="text-gray-400 mt-3">
              {gem.description}
            </p>

            <div className="mt-5 space-y-2 text-sm text-gray-300">

              <p>
                🕒 <strong>Best Time:</strong> {gem.best_time}
              </p>

              <p>
                🚗 <strong>Travel Time:</strong> {gem.travel_time}
              </p>

              <p>
                🎟 <strong>Entry Fee:</strong> {gem.entry_fee}
              </p>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
};

export default HiddenGems;