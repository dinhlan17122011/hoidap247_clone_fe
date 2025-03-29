import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import MainLayout from './layouts/MainLayout.jsx';
import ProfileLayout from './layouts/ProfileLayout';
import Login_Register_Layout from './layouts/Login_Register_Layout.jsx';
import HomePage from './pages/HomePages/HomePages';
import LoginPage from './pages/LoginPage/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage/RegisterPage.jsx';
import VerifyPage from './pages/VerifyPage/VerifyPage.jsx';
import Profilepage from './pages/ProfilePage/Profilepage.jsx';

const AppRoutes = () => {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    {/* Layout chính */}
                    <Route path="/" element={<MainLayout />}>
                        <Route index element={<HomePage />} />
                    </Route>

                    {/* Layout hồ sơ cá nhân */}
                    <Route path="/profile/:userId" element={<ProfileLayout />}>
                        <Route index element={<Profilepage />} />
                    </Route>

                    {/* Layout đăng nhập/đăng ký */}
                    <Route element={<Login_Register_Layout />}>
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />
                        <Route path="/verify" element={<VerifyPage />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
};

export default AppRoutes;
