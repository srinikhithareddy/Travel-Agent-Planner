import { motion } from "framer-motion";

const FeatureCard = ({ icon: Icon, title, description }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
      className="bg-[#111827] border border-gray-700 rounded-2xl p-6 shadow-lg hover:border-cyan-500 hover:shadow-cyan-500/20 transition-all duration-300"
    >
      <div className="w-14 h-14 rounded-xl bg-cyan-500/20 flex items-center justify-center mb-5">
        <Icon size={30} className="text-cyan-400" />
      </div>

      <h3 className="text-xl font-bold text-white mb-3">
        {title}
      </h3>

      <p className="text-gray-400 leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
};

export default FeatureCard;