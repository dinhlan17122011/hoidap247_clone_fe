import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchQuestion = () => {
    const [query, setQuery] = useState('');
    const navigate = useNavigate();

    const handleSearch = () => {
        if (query.trim()) {
            const slug = query
                .toLowerCase()
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '') // Loại bỏ dấu tiếng Việt
                .replace(/\s+/g, '-') // Thay dấu cách bằng dấu gạch ngang
                .replace(/[^a-z0-9-]/g, ''); // Xóa ký tự đặc biệt

            console.log('🔍 Điều hướng đến:', `http://localhost:5173/search/question/${encodeURIComponent(slug)}`);
            navigate(`/search/question?q=${encodeURIComponent(slug)}`);
        }
    };

    return (
        <div className="flex items-center w-1/3 bg-[#ecf4e9] rounded-lg">
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Câu hỏi của bạn là gì?"
                className="flex-1 px-4 py-2 text-gray-700 bg-transparent outline-none placeholder-gray-500"
            />
            <button
                onClick={handleSearch}
                className="px-4 py-2 text-white bg-yellow-500 rounded-r-lg hover:bg-yellow-600"
            >
                Tìm
            </button>
        </div>
    );
};

export default SearchQuestion;
