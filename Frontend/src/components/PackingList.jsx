const PackingList = ({ items }) => {
  if (!items?.length) return null;

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 mt-10">

      <h2 className="text-3xl font-bold mb-6">
        🎒 Packing Checklist
      </h2>

      <div className="grid md:grid-cols-2 gap-4">

        {items.map((item, index) => (
          <div
            key={index}
            className="bg-zinc-800 rounded-xl p-4"
          >
            ✅ {item}
          </div>
        ))}

      </div>

    </div>
  );
};

export default PackingList;