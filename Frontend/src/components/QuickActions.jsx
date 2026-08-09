import { useNavigate } from "react-router-dom";
import {
  CalendarDays,
  MapPinned,
  UtensilsCrossed,
  Wallet,
  Backpack,
  Images,
  Bot,
} from "lucide-react";

const actions = [
  {
    title: "Itinerary",
    icon: CalendarDays,
    path: "/itinerary",
    color: "text-cyan-400",
  },
  {
    title: "Explore",
    icon: MapPinned,
    path: "/explore",
    color: "text-green-400",
  },
  {
    title: "Food Guide",
    icon: UtensilsCrossed,
    path: "/food",
    color: "text-orange-400",
  },
  {
    title: "Budget",
    icon: Wallet,
    path: "/budget",
    color: "text-yellow-400",
  },
  {
    title: "Essentials",
    icon: Backpack,
    path: "/essentials",
    color: "text-pink-400",
  },
  {
    title: "Gallery",
    icon: Images,
    path: "/gallery",
    color: "text-purple-400",
  },
  {
    title: "Ask AI",
    icon: Bot,
    path: "/assistant",
    color: "text-blue-400",
  },
];

export default function QuickActions() {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    // Save current scroll position before navigating
    sessionStorage.setItem("dashboardScroll", window.scrollY.toString());
    navigate(path);
  };

  return (
    <div className="mt-10">

      <h2 className="text-3xl font-bold mb-6">
        Explore Your Trip
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

        {actions.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.title}
              onClick={() => handleNavigate(item.path)}
              className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:border-cyan-500 hover:scale-105 transition duration-300"
            >
              <Icon
                size={40}
                className={`${item.color} mx-auto mb-4`}
              />

              <h3 className="font-semibold text-lg">
                {item.title}
              </h3>

            </button>
          );
        })}

      </div>

    </div>
  );
}