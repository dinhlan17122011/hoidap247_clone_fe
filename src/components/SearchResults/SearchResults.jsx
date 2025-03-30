import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import slugify from 'slugify';

const API_URL = 'http://localhost:3000';

const SearchResults = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get('q');

    console.log('🔍 Query từ URL:', query); // Debug để xem có lấy được giá trị không
    const [results, setResults] = useState([]);
    useEffect(() => {
        if (query) {
            const formattedQuery = slugify(query, { lower: true, strict: true });
            axios
                .get(`${API_URL}/api/question/search?q=${encodeURIComponent(formattedQuery)}`)
                .then((res) => setResults(res.data))
                .then((data) => setResults(data))
                .catch((err) => console.error('Lỗi tìm kiếm:', err));
        }
    }, [query]);

    return (
        <div className="p-4">
            <h2 className="text-xl font-semibold mb-4">Kết quả tìm kiếm cho: "{query}"</h2>
            {results.length > 0 ? (
                <ul>
                    {results.map((question) => (
                        <li key={question._id} className="mb-2 p-2 border-b">
                            <Link to={`/questions/${question.slug}`} className="text-blue-500 hover:underline">
                                {question.title}
                            </Link>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Không tìm thấy kết quả nào.</p>
            )}
        </div>
    );
};

export default SearchResults;
