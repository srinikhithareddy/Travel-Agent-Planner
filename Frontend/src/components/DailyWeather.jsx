const DailyWeather = ({ forecast }) => {

  if (!forecast || forecast.length === 0) return null;

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 mt-10">

      <h2 className="text-3xl font-bold mb-6">
        🌤 Daily Forecast
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-5">

        {forecast.map((day, index)=>(
          <div
            key={index}
            className="bg-zinc-800 rounded-xl p-5 text-center"
          >

            <h3 className="font-semibold text-lg">
              {day.day}
            </h3>

            <p className="text-3xl my-4">
                ☀
            </p>

            <p className="text-xl font-bold">
              {day.temperature}
            </p>

            <p className="text-gray-400 mt-2">
              {day.condition}
            </p>

          </div>
        ))}

      </div>

    </div>
  );
};

export default DailyWeather;