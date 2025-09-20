import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import { routes } from "./router/routes";

function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route index element={<Navigate to="/dashboard" replace />} />
          {routes.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;
