import React, { useEffect, useState } from 'react';
import { Box, Paper, Typography, Avatar, CircularProgress, Alert } from '@mui/material';
import axiosClient from '../../../api/axiosClient';
// import useUser from "../../../hooks/useUser";

const AnswerCard = ({ questionId }) => {
    const [answers, setAnswers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [users, setUsers] = useState({}); // Lưu thông tin user theo userId

    useEffect(() => {
        const fetchAnswers = async () => {
            try {
                if (!questionId) return;
                const response = await axiosClient.get(`/answer/${questionId}`);
                setAnswers(response.data);

                // Lấy danh sách userId từ câu trả lời
                const userIds = [...new Set(response.data.map((answer) => answer.userId))];

                // Fetch thông tin từng user
                const usersData = {};
                for (const userId of userIds) {
                    try {
                        const userResponse = await axiosClient.get(`http://localhost:3000/api/user/profile/${userId}`);
                        usersData[userId] = userResponse.data;
                    } catch (userErr) {
                        console.error(`Lỗi khi lấy user ${userId}:`, userErr);
                    }
                }
                setUsers(usersData);
            } catch (err) {
                console.log(err);
                setError('Không thể tải câu trả lời');
            } finally {
                setLoading(false);
            }
        };

        fetchAnswers();
    }, [questionId]);

    const decodeHTML = (str) => {
        const doc = new DOMParser().parseFromString(str, 'text/html');
        return doc.body.textContent || '';
    };

    if (loading) return <CircularProgress />;
    if (error) return <Alert severity="error">{error}</Alert>;

    return (
        <Box mt={2}>
            {answers.length > 0 ? (
                answers.map((answer) => {
                    const user = users[answer.userId] || {};

                    return (
                        <Paper
                            key={answer._id}
                            elevation={3}
                            sx={{
                                maxWidth: 600,
                                padding: 2,
                                borderRadius: 2,
                                backgroundColor: '#f5f5f5',
                                marginBottom: 2,
                            }}
                        >
                            <Box display="flex" alignItems="center" gap={1} mb={1}>
                                <Avatar src={user.avatar ? `http://localhost:3000${user.avatar}` : undefined}>
                                    {user.username?.charAt(0) || 'Ẩn danh'}
                                </Avatar>

                                <Typography variant="subtitle2" fontWeight="bold">
                                    {user.username || 'Ẩn danh'}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                    {new Date(answer.createdAt).toLocaleTimeString('vi-VN')}
                                </Typography>
                            </Box>
                            <Typography variant="body1">
                                <strong>Đáp án:</strong> {decodeHTML(answer.content)}
                            </Typography>
                        </Paper>
                    );
                })
            ) : (
                <Typography>Chưa có câu trả lời nào.</Typography>
            )}
        </Box>
    );
};

export default AnswerCard;
