import { Wallet, Hotel, UtensilsCrossed, Car, Ticket, CircleDollarSign } from "lucide-react";

const BudgetCard = ({ budget }) => {
  if (!budget) return null;

  return (
    <div className="bg-[#111827] border border-gray-700 rounded-2xl p-6 shadow-lg mt-8">
      <div className="flex items-center gap-3 mb-6">
        <Wallet className="text-green-400" size={30} />
        <h2 className="text-2xl font-bold text-white">
          Budget Breakdown
        </h2>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-5">

        <div className="bg-[#1f2937] rounded-xl p-5 text-center">
          <Hotel className="mx-auto text-cyan-400 mb-3" size={30} />
          <p className="text-gray-400">Hotel</p>
          <h3 className="text-xl font-bold text-white mt-2">
            {budget.hotel}
          </h3>
        </div>

        <div className="bg-[#1f2937] rounded-xl p-5 text-center">
          <UtensilsCrossed
            className="mx-auto text-orange-400 mb-3"
            size={30}
          />
          <p className="text-gray-400">Food</p>
          <h3 className="text-xl font-bold text-white mt-2">
            {budget.food}
          </h3>
        </div>

        <div className="bg-[#1f2937] rounded-xl p-5 text-center">
          <Car className="mx-auto text-blue-400 mb-3" size={30} />
          <p className="text-gray-400">Transport</p>
          <h3 className="text-xl font-bold text-white mt-2">
            {budget.transport}
          </h3>
        </div>

        <div className="bg-[#1f2937] rounded-xl p-5 text-center">
          <Ticket className="mx-auto text-purple-400 mb-3" size={30} />
          <p className="text-gray-400">Activities</p>
          <h3 className="text-xl font-bold text-white mt-2">
            {budget.activities}
          </h3>
        </div>

        <div className="bg-[#1f2937] rounded-xl p-5 text-center">
          <CircleDollarSign
            className="mx-auto text-yellow-400 mb-3"
            size={30}
          />
          <p className="text-gray-400">Miscellaneous</p>
          <h3 className="text-xl font-bold text-white mt-2">
            {budget.misc}
          </h3>
        </div>

      </div>

      <div className="mt-6 bg-green-900/20 border border-green-500 rounded-xl p-4">
        <h3 className="text-green-300 font-semibold">
          AI Budget Insight
        </h3>

        <p className="text-gray-300 mt-2">
          This budget estimate is tailored to your travel style and
          preferences. Actual costs may vary depending on the season,
          availability, and personal spending habits.
        </p>
      </div>
    </div>
  );
};

export default BudgetCard;