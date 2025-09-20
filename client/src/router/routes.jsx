import Dashboard from "../pages/Dashboard";
import Tables from "../pages/Tables";
import NotFound from "../pages/NotFound";

export const routes = [
  {
    path: "/dashboard",
    title: "Dashboard",
    element: <Dashboard />,
  },
  {
    path: "/tables",
    title: "Tables",
    element: <Tables />,
  },
  {
    path: "*",
    title: "Not Found",
    element: <NotFound />,
  },
];
