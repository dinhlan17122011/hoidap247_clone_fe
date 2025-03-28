import { Outlet } from 'react-router-dom';
import HeaderComponent from '../components/HeaderComponents/HeaderComponents.jsx';
import Sidebar from '../components/SidebarComponents/SidebarComponents.jsx';
// import Footer from "../components/Footer";

const MainLayout = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <HeaderComponent />
            <div className="flex flex-1">
                <Sidebar />
                <main className="flex-1 p-4">
                    <Outlet />
                </main>
            </div>
            {/* <Footer /> */}
        </div>
    );
};

export default MainLayout;
