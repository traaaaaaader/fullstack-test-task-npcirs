import { useLocation } from "react-router-dom";
import { routes } from "../router/routes";
import { Home, User } from "lucide-react";

const Header = () => {
  const location = useLocation();
  const page = routes.find((el) => el.path === location.pathname);

  return (
    <header className="flex items-center justify-between px-8 py-4 bg-white shadow-md sticky top-0 z-50">
      <div className="flex items-center gap-2 text-gray-700">
        <Home className="w-5 h-5 text-blue-500" />
        <span className="text-sm text-gray-400">Page /</span>
        <span className="font-medium text-gray-700">
          {page ? page.title : location.pathname.slice(1)}
        </span>
      </div>

      <div className="flex items-center gap-4">
        <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-bold shadow-md cursor-pointer hover:bg-blue-600 transition">
          <User />
        </div>
      </div>
    </header>
  );
};

export default Header;
