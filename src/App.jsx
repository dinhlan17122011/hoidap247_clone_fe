import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout.jsx';
import AuthLayout from './layouts/AuthLayout';
import ProfileLayout from './layouts/ProfileLayout';
import HomePage from './pages/HomePages/HomePages';

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* Layout chính */}
                <Route path="/" element={<MainLayout />}>
                    <Route index element={<HomePage />} />
                </Route>
                {/* Layout đăng nhập/đăng ký */}
                <Route element={<AuthLayout />}></Route>

                {/* Layout hồ sơ cá nhân */}
                <Route element={<ProfileLayout />}></Route>
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;
