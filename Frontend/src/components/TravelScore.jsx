import { Star } from "lucide-react";

const TravelScore = ({ score }) => {

  if (!score) return null;

  const ratings = [
    ["Weather", score.weather],
    ["Budget", score.budget],
    ["Safety", score.safety],
    ["Crowd", score.crowd],
    ["Scenery", score.scenery],
  ];

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 mt-10">

      <h2 className="text-3xl font-bold mb-6">
        ⭐ AI Travel Score
      </h2>

      {ratings.map(([title, value]) => (
        <div
          key={title}
          className="flex justify-between items-center mb-4"
        >
          <span>{title}</span>

          <div className="flex gap-1">

            {[1,2,3,4,5].map((i)=>(
              <Star
                key={i}
                size={18}
                fill={i<=value ? "#facc15":"transparent"}
                color="#facc15"
              />
            ))}

          </div>

        </div>
      ))}

      <div className="border-t border-zinc-700 mt-6 pt-6">

        <p className="text-gray-400">
          Overall AI Rating
        </p>

        <h1 className="text-5xl font-bold text-cyan-400 mt-2">
          {score.overall}/10
        </h1>

        <p className="text-gray-400 mt-4">
          {score.reason}
        </p>

      </div>

    </div>
  );
};

export default TravelScore;