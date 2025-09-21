import { BrowserRouter } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Router from "./router/Router";

function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Router />
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;
