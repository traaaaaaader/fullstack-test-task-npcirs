import { Routes, Route, Navigate } from "react-router-dom";
import { routes } from "./routes";

const Router = () => {
  return (
    <Routes>
      <Route index element={<Navigate to="/tables" replace />} />
      {routes.map(({ path, element }) => (
        <Route key={path} path={path} element={element} />
      ))}
    </Routes>
  );
};

export default Router;
