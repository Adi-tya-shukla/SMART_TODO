import { Outlet } from "react-router-dom";
import Navbar from "./Header";
import Footer from "./Footer";
import { useTheme } from "../Context/ThemeContext";

const Layout = () => {
  const { darkMode } = useTheme();

  return (
    <div className={`${darkMode ? "bg-slate-800 text-white" : "bg-slate-200 text-gray-900"} min-h-screen`}>
      <Navbar />
      <main className="container mx-auto p-4 flex-1 min-h-[calc(78vh-75px)]">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
