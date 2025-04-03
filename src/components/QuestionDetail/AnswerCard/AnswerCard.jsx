import React, { useEffect, useState } from 'react';
import { Box, Paper, Typography, Avatar, CircularProgress, Alert } from '@mui/material';
import axiosClient from '../../../api/axiosClient';
import useUser from '../../../hooks/useUser';

const AnswerCard = ({ userId, questionId }) => {
    const [answers, setAnswers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userIdAnswer, setUserIdAnswer] = useState(null);
    console.log('UserId : ', userId);

    useEffect(() => {
        const fetchAnswers = async () => {
            try {
                if (!questionId) return;
                const response = await axiosClient.get(`/answer/${questionId}`);
                setAnswers(response.data);
                const data = response.data;
                const userIds = data.map((answer) => answer.userId);
                const userIdString = userIds.join();

                setUserIdAnswer(userIdString);
            } catch (err) {
                console.log(err);
                setError('Không thể tải câu trả lời');
            } finally {
                setLoading(false);
            }
        };

        fetchAnswers();
    }, [questionId, userIdAnswer]);

    const { user } = useUser(userIdAnswer);
    const avatar = 'http://localhost:3000' + user?.avatar;

    if (loading) return <CircularProgress />;
    if (error) return <Alert severity="error">{error}</Alert>;

    return (
        <Box mt={2}>
            {answers.length > 0 ? (
                answers.map((answer) => (
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
                            <Avatar src={avatar} />
                            <Typography variant="subtitle2" fontWeight="bold">
                                {user?.username || 'Ẩn danh'}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                                {new Date(answer.createdAt).toLocaleTimeString('vi-VN')}
                            </Typography>
                        </Box>
                        <Typography variant="body1">
                            <strong>Đáp án:</strong> {answer.content}
                        </Typography>
                    </Paper>
                ))
            ) : (
                <Typography>Chưa có câu trả lời nào.</Typography>
            )}
        </Box>
    );
};

export default AnswerCard;
