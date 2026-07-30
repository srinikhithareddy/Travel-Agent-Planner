import Navbar from "../components/Navbar";
import TravelForm from "../components/TravelForm";

export default function Planner() {
  return (
    <div className="bg-black min-h-screen text-white">
      <Navbar />

      <div className="max-w-5xl mx-auto py-16 px-6">
        <TravelForm />
      </div>
    </div>
  );
}