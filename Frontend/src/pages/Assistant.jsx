import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const Assistant = () => {
  const [question, setQuestion] = useState("");
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white px-6 py-10">

      <div className="max-w-5xl mx-auto">

        <button
          onClick={() => navigate("/result")}
          className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition"
        >
          <ArrowLeft size={20} />
          Back to Dashboard
        </button>

        <h1 className="text-4xl font-bold mb-2">
          🤖 VoyageAI Assistant
        </h1>

        <p className="text-gray-400 mb-8">
          Ask anything about your trip.
        </p>

        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Example: Suggest nearby restaurants..."
          className="w-full bg-zinc-900 border border-zinc-700 rounded-xl p-5 h-40 outline-none focus:border-cyan-400"
        />

        <button
          className="mt-6 bg-cyan-500 hover:bg-cyan-600 px-8 py-3 rounded-xl font-semibold transition"
        >
          Ask AI
        </button>

        <div className="mt-12">

          <h2 className="text-2xl font-semibold mb-4">
            Suggested Questions
          </h2>

          <div className="grid md:grid-cols-2 gap-4">

            <div className="bg-zinc-900 rounded-xl p-4">
              🌧 Suggest indoor places if it rains
            </div>

            <div className="bg-zinc-900 rounded-xl p-4">
              🍽 Recommend nearby restaurants
            </div>

            <div className="bg-zinc-900 rounded-xl p-4">
              🚕 Estimate taxi fare
            </div>

            <div className="bg-zinc-900 rounded-xl p-4">
              🏕 Suggest hidden gems
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Assistant;