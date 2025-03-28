import {
    FaBook,
    FaFlask,
    FaCalculator,
    FaLanguage,
    FaHistory,
    FaGlobe,
    FaBalanceScale,
    FaLaptopCode,
    FaTools,
    FaMusic,
    FaAtom,
    FaMap,
    FaEllipsisH,
} from 'react-icons/fa';

import './index.css'
const subjects = [
    { name: 'Tất cả', icon: <FaBook /> },
    { name: 'Toán Học', icon: <FaCalculator /> },
    { name: 'Vật Lý', icon: <FaFlask /> },
    { name: 'Hóa Học', icon: <FaFlask /> },
    { name: 'Tiếng Anh', icon: <FaLanguage /> },
    { name: 'Ngữ Văn', icon: <FaBook /> },
    { name: 'Sinh Học', icon: <FaAtom /> },
    { name: 'Lịch Sử', icon: <FaHistory /> },
    { name: 'Địa Lý', icon: <FaGlobe /> },
    { name: 'GDCD', icon: <FaBalanceScale /> },
    { name: 'Tin Học', icon: <FaLaptopCode /> },
    { name: 'Công Nghệ', icon: <FaTools /> },
    { name: 'Nhạc Họa', icon: <FaMusic /> },
    { name: 'KHTN', icon: <FaAtom /> },
    { name: 'Sử & Địa', icon: <FaMap /> },
    { name: 'Khác', icon: <FaEllipsisH /> },
];

const SidebarComponents = () => {
    return (
        <div className="w-48 p-2 rounded-lg shadow-md">
            <ul>
                {subjects.map((subject, index) => (
                    <li
                        key={index}
                        id="li"
                        className={`flex items-center gap-2 px-4 py-2 text-gray-800 rounded-md cursor-pointer hover:bg-gray-200 ${
                            subject.bg || 'bg-transparent'
                        }`}
                    >
                        <span className="text-lg">{subject.icon}</span>
                        <span className="text-sm font-medium">{subject.name}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SidebarComponents;
