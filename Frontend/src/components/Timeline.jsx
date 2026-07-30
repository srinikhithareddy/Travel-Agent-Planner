import { CalendarDays, Clock } from "lucide-react";

const Timeline = ({ itinerary }) => {
  if (!itinerary || itinerary.length === 0) return null;

  return (
    <div className="bg-[#111827] border border-gray-700 rounded-2xl p-6 shadow-lg mt-8">
      <div className="flex items-center gap-3 mb-8">
        <CalendarDays className="text-cyan-400" size={30} />
        <h2 className="text-2xl font-bold text-white">
          Day-wise Itinerary
        </h2>
      </div>

      <div className="space-y-8">
        {itinerary.map((day, index) => (
          <div
            key={index}
            className="relative border-l-4 border-cyan-500 pl-8 pb-8"
          >
            <div className="absolute -left-3 top-1 w-6 h-6 rounded-full bg-cyan-500 border-4 border-[#111827]" />

            <div className="bg-[#1f2937] rounded-xl p-5">

              <h3 className="text-xl font-bold text-cyan-400">
                Day {day.day}
              </h3>

              <p className="text-lg font-semibold text-white mt-2">
                {day.title}
              </p>

              <div className="mt-5 space-y-3">
                {day.activities?.map((activity, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 bg-[#111827] rounded-lg p-3"
                  >
                    <Clock
                      size={18}
                      className="text-cyan-400 mt-1"
                    />

                    <p className="text-gray-300">
                      {activity}
                    </p>
                  </div>
                ))}
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;