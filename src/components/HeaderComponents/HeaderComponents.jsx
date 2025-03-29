import React, { useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { IoMdArrowDropdown } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; // Import AuthContext
import logo from '../../assets/logo_h247.png';
const API_URL = 'http://localhost:3000';

const HeaderComponents = () => {
    const { user, setUser } = useAuth();
    const [openMenu, setOpenMenu] = useState(false);
    const handleLogout = () => {
        localStorage.removeItem('token'); // Xóa token
        localStorage.removeItem('user'); // Xóa thông tin user
        setUser(null); // Cập nhật state về null
        window.location.reload(); // Reload lại trang để cập nhật giao diện
    };

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

            {/* Nếu chưa đăng nhập, hiển thị nút đăng nhập/đăng ký */}
            {!user ? (
                <div className="space-x-4 text-gray-700">
                    <button>
                        <Link to="/login">Đăng nhập</Link>
                    </button>
                    <span>|</span>
                    <button>
                        <Link to="/register">Đăng ký</Link>
                    </button>
                </div>
            ) : (
                <div className="relative">
                    {/* Avatar & Menu */}
                    <button onClick={() => setOpenMenu(!openMenu)} className="flex items-center space-x-2">
                        <img
                            src={user?.avatar ? `${API_URL}${user.avatar}` : '/default-avatar.jpg'}
                            alt="Avatar"
                            className="w-10 h-10 rounded-full border"
                        />
                        <span>{user.username}</span>
                        <IoMdArrowDropdown />
                    </button>

                    {/* Dropdown Menu */}
                    {openMenu && (
                        <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg p-2">
                            <Link to={`/profile/${user.id}`} className="block px-4 py-2 hover:bg-gray-100">
                                Hồ sơ cá nhân
                            </Link>

                            <button
                                onClick={handleLogout}
                                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                            >
                                Đăng xuất
                            </button>
                        </div>
                    )}
                </div>
            )}
        </header>
    );
};

export default HeaderComponents;
