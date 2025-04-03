import React, { useState, useEffect } from 'react';
import { RichTextEditor } from '@mantine/rte';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AskQuestion = () => {
    const [content, setContent] = useState('');
    const [userId, setUserId] = useState(null);
    const [selectedSubject, setSelectedSubject] = useState('');
    const [newTag, setNewTag] = useState('');
    const [tags, setTags] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user.id) {
            setUserId(user.id);
        }
    }, []);

    const handleTagInputChange = (e) => {
        setNewTag(e.target.value);
    };

    const handleTagKeyPress = (e) => {
        if (e.key === 'Enter' && newTag.trim() !== '') {
            setTags((prevTags) => [...prevTags, newTag.trim()]);
            setNewTag('');
        }
    };

    // Hàm xóa tag khỏi mảng
    const handleRemoveTag = (tagToRemove) => {
        setTags(tags.filter((tag) => tag !== tagToRemove));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!content.trim()) {
            alert('Vui lòng nhập nội dung câu hỏi!');
            return;
        }

        if (!selectedSubject) {
            alert('Vui lòng chọn môn học!');
            return;
        }

        if (tags.length === 0) {
            alert('Vui lòng thêm ít nhất một tag!');
            return;
        }

        try {
            const response = await axios.post('http://localhost:3000/api/question/addQuestion', {
                content,
                userId,
                subject: selectedSubject,
                tags,
            });

            console.log(response);
            navigate('/'); // Điều hướng về trang home (root)
        } catch (error) {
            console.error('Lỗi gửi câu hỏi:', error);
            alert('Lỗi khi gửi câu hỏi!');
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-5">
            <h1 className="text-2xl font-bold mb-4">Đặt Câu Hỏi</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold">Nội dung:</label>
                    <RichTextEditor value={content} onChange={setContent} placeholder="Nhập nội dung câu hỏi..." />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold">Chọn môn học:</label>
                    <select
                        value={selectedSubject}
                        onChange={(e) => setSelectedSubject(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-lg"
                    >
                        <option value="">Chọn môn học</option>
                        <option value="Toán">Toán</option>
                        <option value="Vật lý">Vật lý</option>
                        <option value="Hóa học">Hóa học</option>
                        <option value="Sinh học">Sinh học</option>
                        <option value="Ngoại ngữ 1">Ngoại ngữ</option>
                        <option value="Lịch sử">Lịch sử</option>
                        <option value="Địa lý">Địa lý</option>
                        <option value="Ngữ văn">Ngữ văn</option>
                        <option value="Giáo dục công dân">Giáo dục công dân</option>
                        <option value="Tin học">Tin học</option>
                        <option value="Công nghệ">Công nghệ</option>
                        <option value="Mỹ thuật">Mỹ thuật</option>
                        <option value="Âm nhạc">Âm nhạc</option>
                        <option value="Khác">Khác</option>
                    </select>
                </div>

                {/* Phần nhập tags */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold">Tags:</label>
                    <input
                        type="text"
                        value={newTag}
                        onChange={handleTagInputChange}
                        onKeyPress={handleTagKeyPress}
                        className="w-full p-2 border border-gray-300 rounded-lg"
                        placeholder="Nhập tag và nhấn Enter"
                    />
                    <div className="mt-2">
                        {tags.length > 0 && (
                            <div>
                                <span className="font-semibold">Tags đã chọn: </span>
                                {tags.map((tag, index) => (
                                    <span
                                        key={index}
                                        className="inline-block bg-blue-200 text-blue-800 py-1 px-3 rounded-full mr-2"
                                    >
                                        {tag}
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveTag(tag)}
                                            className="ml-2 text-red-500 hover:text-red-700"
                                        >
                                            X
                                        </button>
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
                >
                    Đăng Câu Hỏi
                </button>
            </form>
        </div>
    );
};

export default AskQuestion;
