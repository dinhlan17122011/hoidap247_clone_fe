import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { RichTextEditor } from '@mantine/rte';

const AskAnswers = ({ questionId }) => {
    const [answers, setAnswers] = useState([]);
    const [answerContent, setAnswerContent] = useState('');
    const [userId, setUserId] = useState(null);
    console.log(questionId);
    
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user.id) {
            setUserId(user.id);
        }

        const fetchAnswers = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/answer/${questionId}`);
                setAnswers(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchAnswers();
    }, [questionId]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!answerContent.trim()) {
            alert('Vui lòng nhập nội dung câu trả lời.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:3000/api/answer/addAnswer', {
                content: answerContent,
                userId,
                questionId,
            });

            setAnswers([...answers, response.data]);
            setAnswerContent('');
        } catch (error) {
            console.error(error);
            alert('Lỗi khi gửi câu trả lời.');
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-5">
            <h2 className="text-xl font-bold mb-4">Trả lời câu hỏi</h2>

            {/* Form nhập câu trả lời */}
            <form onSubmit={handleSubmit} className="mb-4">
                <RichTextEditor
                    value={answerContent}
                    onChange={setAnswerContent}
                    placeholder="Nhập câu trả lời của bạn..."
                />
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition mt-2"
                >
                    Gửi câu trả lời
                </button>
            </form>
        </div>
    );
};

export default AskAnswers;
