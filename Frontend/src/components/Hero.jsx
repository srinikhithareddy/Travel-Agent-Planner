import { useNavigate } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden bg-black">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-blue-500/10 blur-3xl"></div>

      <div className="relative max-w-6xl mx-auto px-6 py-28 text-center">
        <h1 className="text-6xl font-extrabold leading-tight text-white">
          Plan Your Dream Trip
          <br />
          <span className="text-cyan-400">with AI Agents</span>
        </h1>

        <p className="text-slate-300 mt-8 text-xl max-w-3xl mx-auto">
          TravelAI intelligently plans your vacation using multiple AI agents
          that recommend hotels, restaurants, tourist attractions,
          weather forecasts, and budget optimization.
        </p>

        <button
          onClick={() => navigate("/planner")}
          className="mt-10 px-8 py-4 bg-cyan-500 hover:bg-cyan-400 rounded-xl text-black font-bold text-lg transition-all duration-300"
        >
          Start Planning
        </button>
      </div>
    </section>
  );
}