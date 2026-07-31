import { useEffect, useState } from "react";

const Gallery = () => {
  const [trip, setTrip] = useState(null);

  useEffect(() => {
    const storedTrip = localStorage.getItem("tripResult");

    if (storedTrip) {
      setTrip(JSON.parse(storedTrip));
    }
  }, []);

  if (!trip) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white">
        Loading gallery...
      </div>
    );
  }

  const galleryItems =
    trip.gallery && trip.gallery.length > 0
      ? trip.gallery
      : trip.attractions?.map((a) => a.name) || [];

  return (
    <div className="min-h-screen bg-black text-white px-6 py-10">
      <div className="max-w-7xl mx-auto">

        <h1 className="text-4xl font-bold mb-2">
          📸 Destination Gallery
        </h1>

        <p className="text-gray-400 mb-10">
          Explore some beautiful places from your trip.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {galleryItems.map((place, index) => (
            <div
              key={index}
              className="bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 hover:scale-[1.02] transition duration-300"
            >
              <img
                src={`https://source.unsplash.com/600x400/?${encodeURIComponent(
                  place
                )}`}
                alt={place}
                className="w-full h-60 object-cover"
              />

              <div className="p-5">
                <h2 className="text-xl font-semibold">
                  {place}
                </h2>

                <p className="text-gray-400 mt-2">
                  AI-selected destination for your itinerary.
                </p>
              </div>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
};

export default Gallery;