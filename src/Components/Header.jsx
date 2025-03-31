import { Link } from "react-router-dom";
import { useTheme } from "../Context/ThemeContext";
const Navbar = () => {
  const { darkMode, setDarkMode } = useTheme();

  return (
    <nav className="flex justify-between items-center p-6 bg-purple-50 dark:bg-darkTeal text-gray-900 dark:text-white shadow-md">
      <h1 className="text-xl font-bold">SMART TODOs</h1>
      <div className="flex items-center space-x-4">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="px-4 py-2 bg-gray-700 text-white dark:bg-gray-200 dark:text-green-900 rounded-full transition"
        >
          {darkMode ? "☀️ Light" : "🌙 Dark"}
        </button>
        <Link to="/" className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-full">
          Home
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
