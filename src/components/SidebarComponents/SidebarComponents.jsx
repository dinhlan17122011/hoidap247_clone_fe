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

import './index.css';
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
        <aside className="w-64 bg-gray-100 p-4">
            <ul>
                {subjects.map((subject, index) => (
                    <li
                        key={index}
                        className={`flex items-center p-2 mb-2 rounded cursor-pointer ${
                            subject.active ? 'bg-yellow-500 text-white' : 'hover:bg-gray-200'
                        }`}
                    >
                        <span className="mr-2">{subject.icon}</span> {subject.name}
                    </li>
                ))}
            </ul>
        </aside>
    );
};

export default SidebarComponents;
