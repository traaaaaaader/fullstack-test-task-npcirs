import { useLocation } from "react-router-dom";
import { routes } from "../router/routes";

const Header = () => {
  const location = useLocation();
  const page = routes.find((el) => el.path === location.pathname);

  return (
    <div className="flex p-6 bg-gray-300">
      <div>
        <span className="text-gray-500">Page / </span>
        {page ? page.title : location.pathname.slice(1)}
      </div>
    </div>
  );
};

export default Header;
