import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const MainLayout = ({ children }) => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full h-screen overflow-hidden flex flex-col">
        <Header />
        {children}
      </div>
    </div>
  );
};

export default MainLayout;
