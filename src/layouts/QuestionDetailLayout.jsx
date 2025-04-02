import { Outlet } from 'react-router-dom';
import HeaderComponent from '../components/HeaderComponents/HeaderComponents.jsx';
// import Footer from "../components/Footer";
import RightPanel from '../components/RightPanel/RightPanel.jsx';

const MainLayout = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <HeaderComponent />
            <div className="flex flex-1">
                <main className="flex-1 p-4">
                    <Outlet />
                </main>
                <RightPanel />
            </div>
            {/* <Footer /> */}
        </div>
    );
};

export default MainLayout;
