import React from 'react';
import { FaUserCircle } from 'react-icons/fa'; // Icon tài khoản
import logo from '../../assets/logo_h247.png';
const HeaderComponents = () => {
    return (
        <header className="flex items-center justify-between px-6 py-3 bg-white shadow-md">
            {/* Logo */}
            <div>
                <img src={logo} alt="Hoidap247 Logo" className="h-10" />
            </div>

            {/* Thanh tìm kiếm */}
            <div className="flex items-center w-1/3 bg-[#ecf4e9] rounded-lg">
                <input
                    type="text"
                    placeholder="Câu hỏi của bạn là gì?"
                    className="flex-1 px-4 py-2 text-gray-700 bg-transparent outline-none placeholder-gray-500"
                />
                <button className="px-4 py-2 text-white bg-yellow-500 rounded-r-lg hover:bg-yellow-600">Tìm</button>
            </div>

            {/* Đăng nhập & Đăng ký */}
            <div className="flex items-center gap-2 text-gray-700">
                <FaUserCircle className="text-xl" />
                <span className="cursor-pointer hover:text-blue-500">Đăng nhập</span>
                <span className="text-gray-400">|</span>
                <span className="cursor-pointer hover:text-blue-500">Đăng ký</span>
            </div>
        </header>
    );
};

export default HeaderComponents;
