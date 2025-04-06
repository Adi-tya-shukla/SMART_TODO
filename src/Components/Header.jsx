import { Link } from "react-router-dom";
import { useTheme } from "../Context/ThemeContext";
const Navbar = () => {
  const { darkMode, setDarkMode } = useTheme();

  return (
    <nav className="flex justify-between items-center p-4 bg-purple-50 dark:bg-darkTeal
     text-gray-900 dark:text-white shadow-md">
      <h1 className="text-xl font-bold">SMART TODOs</h1>
      <div className="flex items-center space-x-4">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="px-2 py-1 transition"
        >
          {darkMode ?  "🌙": "☀️"}
        </button>
        <Link to="/" className="px-2 py-1 text-blue-500 hover:text-blue-100">
          Home
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
