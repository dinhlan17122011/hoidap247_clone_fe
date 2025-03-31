import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Box, Typography, CircularProgress, Alert, Divider, Avatar } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const API_URL = 'http://localhost:3000';

const QuestionDetail = () => {
    const { slug } = useParams(); // Lấy slug từ URL
    const [question, setQuestion] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios
            .get(`${API_URL}/api/question/${slug}`)
            .then((res) => {
                console.log('📌 Chi tiết câu hỏi:', res.data);
                setQuestion(res.data[0]); // Lấy câu hỏi đầu tiên
                setLoading(false);
            })
            .catch((err) => {
                console.error('❌ Lỗi API:', err);
                setError('Không tìm thấy câu hỏi.');
                setLoading(false);
            });
    }, [slug]);

    if (loading) return <CircularProgress />;
    if (error) return <Alert severity="error">{error}</Alert>;
    if (!question) return <Typography textAlign="center">Không có dữ liệu.</Typography>;

    return (
        <Box p={4}>
            <Box display="flex" alignItems="center" gap={2} mb={2}>
                <Avatar src="https://randomuser.me/api/portraits/women/44.jpg">
                    <AccountCircleIcon />
                </Avatar>
                <Box>
                    <Typography variant="body1" fontWeight="bold" color="primary">
                        {question.subject}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {new Date(question.createdAt).toLocaleString()}
                    </Typography>
                </Box>
            </Box>

            <Divider sx={{ my: 2 }} />

            <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
                {question.content}
            </Typography>
        </Box>
    );
};

export default QuestionDetail;
