import {
  CalendarDays,
  Users,
  Wallet,
  CloudSun,
  MapPinned,
  Plane,
} from "lucide-react";

const SummaryCards = ({ trip }) => {
  const cards = [
    {
      title: "Destination",
      value: trip.destination,
      icon: MapPinned,
      color: "text-cyan-400",
    },
    {
      title: "Travelers",
      value: trip.travelers,
      icon: Users,
      color: "text-green-400",
    },
    {
      title: "Budget",
      value: `₹${trip.total_budget}`,
      icon: Wallet,
      color: "text-yellow-400",
    },
    {
      title: "Weather",
      value: trip.weather.temperature,
      icon: CloudSun,
      color: "text-blue-400",
    },
    {
      title: "Travel Dates",
      value: `${trip.start_date} - ${trip.end_date}`,
      icon: CalendarDays,
      color: "text-purple-400",
    },
    {
      title: "Trip Type",
      value: trip.travel_style || "Personalized",
      icon: Plane,
      color: "text-pink-400",
    },
  ];

  return (
    <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-5 mt-10">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5"
          >
            <Icon size={30} className={`${card.color} mb-4`} />

            <p className="text-gray-400 text-sm">
              {card.title}
            </p>

            <h3 className="font-semibold mt-2 break-words">
              {card.value}
            </h3>
          </div>
        );
      })}
    </div>
  );
};

export default SummaryCards;