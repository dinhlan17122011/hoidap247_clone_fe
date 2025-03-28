import { Outlet } from "react-router-dom";
// import Header from "../components/Header";
// import Sidebar from "../components/Sidebar";

const ProfileLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* <Header /> */}
      <div className="flex flex-1">
        {/* <Sidebar /> */}
        <main className="flex-1 p-4">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <Outlet /> {/* Nội dung trang hồ sơ */}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProfileLayout;
