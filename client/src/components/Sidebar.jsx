import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <nav className="h-screen bg-gray-300 min-w-50">
      <div className="flex flex-col">
        <div className="p-6 rounded-full bg-blue-400 flex justify-center items-center">
          Logo
        </div>
        <div className="flex flex-col mt-10">
          <button className="flex items start p-4 bg-amber-300">
            <NavLink className="text-gray-600" to={"/dashboard"}>
              Dashboard
            </NavLink>
          </button>
          <button className="flex items start p-4 bg-amber-300">
            <NavLink className="text-gray-600" to={"/tables"}>
              Tables
            </NavLink>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
