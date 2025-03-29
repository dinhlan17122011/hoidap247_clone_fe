import { Outlet } from "react-router-dom";
import Header from "../components/HeaderComponents/HeaderComponents.jsx";
// import Sidebar from "../components/Sidebar";

const ProfileLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-1">
        <main className="flex-1 p-4">
          <div>
            <Outlet /> {/* Nội dung trang hồ sơ */}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProfileLayout;
