import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ProfilePage = () => {
    const { userId } = useParams();
    const [user, setUser] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [avatar, setAvatar] = useState(null);
    const [loading, setLoading] = useState(true);
    console.log('UserID:', userId);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const [userRes, questionsRes, answersRes] = await Promise.allSettled([
                    axios.get(`http://localhost:3000/api/user/profile/${userId}`),
                    axios.get(`http://localhost:3000/api/question/user/${userId}`),
                    axios.get(`http://localhost:3000/api/answer/user/${userId}`),
                ]);

                console.log('Dữ liệu câu trả lời:', answersRes);

                setUser(userRes.status === 'fulfilled' ? userRes.value.data : null);
                setQuestions(
                    questionsRes.status === 'fulfilled' && Array.isArray(questionsRes.value.data)
                        ? questionsRes.value.data
                        : [],
                );
                setAnswers(
                    answersRes.status === 'fulfilled' && Array.isArray(answersRes.value.data)
                        ? answersRes.value.data
                        : [],
                );
            } catch (err) {
                console.error('Lỗi khi tải dữ liệu:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchUserData();
    }, [userId]);

    const handleAvatarChange = (e) => {
        setAvatar(e.target.files[0]);
    };

    const handleUploadAvatar = async () => {
        if (!avatar) return alert('Vui lòng chọn ảnh');

        const formData = new FormData();
        formData.append('avatar', avatar);

        try {
            const res = await axios.post(`http://localhost:3000/api/user/${userId}/avatar`, formData);
            alert('Cập nhật ảnh đại diện thành công!');
            setUser({ ...user, avatar: res.data.avatarUrl });
        } catch (error) {
            console.error(error);
            alert('Lỗi khi cập nhật ảnh đại diện');
        }
    };

    if (loading) return <p className="text-center text-gray-600">Đang tải dữ liệu...</p>;
    console.log(user.avatar);

    return (
        <div className="p-4 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Hồ sơ của {user.username}</h2>

            {/* Ảnh đại diện */}
            <div className="flex items-center gap-4">
                <img
                    src={user.avatar.startsWith('http') ? user.avatar : `http://localhost:3000${user.avatar}`}
                    alt="Avatar"
                    className="w-20 h-20 rounded-full border"
                />

                <div>
                    <input type="file" onChange={handleAvatarChange} />
                    <button onClick={handleUploadAvatar} className="bg-blue-500 text-white px-4 py-2 rounded ml-2">
                        Cập nhật Avatar
                    </button>
                </div>
            </div>

            {/* Danh sách câu hỏi */}
            <h3 className="text-xl font-bold mt-6">Câu hỏi đã đăng</h3>
            {questions.length === 0 ? (
                <p className="text-gray-600">Chưa có câu hỏi nào.</p>
            ) : (
                <ul className="list-disc pl-6">
                    {questions.map((q) => (
                        <li key={q._id}>
                            <a href={`/question/${q.slug}`} className="text-blue-500 hover:underline">
                                {q.title}
                            </a>
                        </li>
                    ))}
                </ul>
            )}

            {/* Danh sách câu trả lời */}
            <h3 className="text-xl font-bold mt-6">Câu trả lời đã đăng</h3>
            {answers.length === 0 ? (
                <p className="text-gray-600">Chưa có câu trả lời nào.</p>
            ) : (
                <ul className="list-disc pl-6">
                    {answers.map((a) => (
                        <li key={a._id} className="border p-2 rounded-md my-2 bg-gray-100">
                            {a.content}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ProfilePage;
