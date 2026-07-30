import { ShieldCheck, CheckCircle2 } from "lucide-react";

const TravelTips = ({ tips }) => {
  if (!tips || tips.length === 0) return null;

  return (
    <div className="bg-[#111827] border border-gray-700 rounded-2xl p-6 shadow-lg mt-8 mb-10">
      <div className="flex items-center gap-3 mb-6">
        <ShieldCheck className="text-green-400" size={30} />
        <h2 className="text-2xl font-bold text-white">
          AI Travel Tips
        </h2>
      </div>

      <div className="space-y-4">
        {tips.map((tip, index) => (
          <div
            key={index}
            className="flex items-start gap-4 bg-[#1f2937] border border-gray-700 rounded-xl p-4 hover:border-green-400 transition-all duration-300"
          >
            <CheckCircle2
              className="text-green-400 mt-1 flex-shrink-0"
              size={22}
            />

            <p className="text-gray-300 leading-relaxed">
              {tip}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-green-900/20 border border-green-500 rounded-xl p-5">
        <h3 className="text-green-300 font-semibold mb-2">
          Safe Journey!
        </h3>

        <p className="text-gray-300">
          Enjoy your trip responsibly, stay hydrated, keep your important
          documents secure, and follow local guidelines for a safe and
          memorable travel experience.
        </p>
      </div>
    </div>
  );
};

export default TravelTips;