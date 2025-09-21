import { Dashboard, Tables, NotFound } from "../pages";

export const routes = [
  {
    path: "/tables",
    title: "Tables",
    element: <Tables />,
  },
  {
    path: "/dashboard",
    title: "Dashboard",
    element: <Dashboard />,
  },
  {
    path: "*",
    title: "Not Found",
    element: <NotFound />,
  },
];
