import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <Outlet /> {/* Form đăng nhập hoặc đăng ký */}
      </div>
    </div>
  );
};

export default AuthLayout;
