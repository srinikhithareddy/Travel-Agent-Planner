import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-black border-b border-gray-800 px-8 py-5">
      <div className="max-w-7xl mx-auto flex justify-between items-center">

        {/* Logo */}
        <Link
          to="/"
          className="text-3xl font-bold text-white tracking-wide"
        >
          Travel<span className="text-cyan-400">AI</span>
        </Link>

        {/* Start Planning Button */}
        <Link
          to="/planner"
          className="bg-cyan-500 hover:bg-cyan-600 px-5 py-2 rounded-xl font-semibold text-white transition duration-300"
        >
          Plan a Trip
        </Link>

      </div>
    </nav>
  );
};

export default Navbar;