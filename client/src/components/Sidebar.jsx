import { NavLink } from "react-router-dom";
import { Hexagon, Table, LayoutDashboard } from "lucide-react";

const Sidebar = () => {
  return (
    <aside className="h-screen bg-gradient-to-b from-gray-900 to-gray-800 w-60 shadow-lg flex flex-col">
      <div className="flex items-center justify-center py-6">
        <div className="w-12 h-12 rounded-2xl bg-blue-500 flex items-center justify-center text-white font-bold text-lg shadow-md">
          <Hexagon />
        </div>
      </div>

      <nav className="flex-1 flex flex-col mt-8 gap-2 px-4">
        <NavLink
          to="/tables"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-xl transition 
             ${
               isActive
                 ? "bg-blue-500 text-white shadow-md"
                 : "text-gray-300 hover:bg-gray-700 hover:text-white"
             }`
          }
        >
          <Table className="w-5 h-5" />
          Tables
        </NavLink>

        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-xl transition 
             ${
               isActive
                 ? "bg-blue-500 text-white shadow-md"
                 : "text-gray-300 hover:bg-gray-700 hover:text-white"
             }`
          }
        >
          <LayoutDashboard className="w-5 h-5" />
          Dashboard
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
