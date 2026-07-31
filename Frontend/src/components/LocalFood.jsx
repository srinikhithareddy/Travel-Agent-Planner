const LocalFood = ({ foods }) => {
  if (!foods?.length) return null;

  return (
    <div className="bg-zinc-900 rounded-2xl border border-zinc-800 p-8 mt-10">
      <h2 className="text-3xl font-bold mb-6">
        🍽 Must Try Local Food
      </h2>

      <div className="grid md:grid-cols-2 gap-5">
        {foods.map((food, index) => (
          <div
            key={index}
            className="bg-zinc-800 rounded-xl p-5"
          >
            <h3 className="font-bold text-xl">
              {food.dish}
            </h3>

            <p className="text-gray-400 mt-2">
              {food.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LocalFood;