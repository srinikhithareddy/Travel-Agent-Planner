const EmergencyCard = ({ emergency }) => {
  if (!emergency) return null;

  return (
    <div className="bg-red-950 border border-red-800 rounded-2xl p-8 mt-10">

      <h2 className="text-3xl font-bold mb-6">
        🚨 Emergency Information
      </h2>

      <div className="grid md:grid-cols-2 gap-6">

        <div>
          <strong>🏥 Hospital</strong>
          <p>{emergency.nearest_hospital}</p>
        </div>

        <div>
          <strong>👮 Police</strong>
          <p>{emergency.police_station}</p>
        </div>

        <div>
          <strong>🚉 Railway Station</strong>
          <p>{emergency.railway_station}</p>
        </div>

        <div>
          <strong>🚌 Bus Station</strong>
          <p>{emergency.bus_station}</p>
        </div>

        <div>
          <strong>🏧 ATM</strong>
          <p>{emergency.atm}</p>
        </div>

      </div>
    </div>
  );
};

export default EmergencyCard;