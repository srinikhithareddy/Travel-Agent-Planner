import { Compass, Mountain, MapPinned } from "lucide-react";

const ExploreHeader = ({ destination }) => {
  return (
    <div className="bg-gradient-to-r from-emerald-700 via-teal-700 to-cyan-800 rounded-3xl p-10 mb-10">

      <div className="flex items-center gap-3 mb-3">
        <Compass size={30} />
        <h1 className="text-4xl font-bold">
          Explore {destination}
        </h1>
      </div>

      <p className="text-emerald-100 text-lg leading-8 max-w-3xl">
        Discover scenic viewpoints, hidden gems, peaceful lakes,
        ancient caves and unforgettable experiences selected by AI
        for your journey.
      </p>

      <div className="flex gap-6 mt-8 flex-wrap">

        <div className="bg-white/10 px-5 py-3 rounded-xl flex items-center gap-2">
          <Mountain size={18}/>
          Nature
        </div>

        <div className="bg-white/10 px-5 py-3 rounded-xl flex items-center gap-2">
          <MapPinned size={18}/>
          AI Curated
        </div>

      </div>

    </div>
  );
};

export default ExploreHeader;