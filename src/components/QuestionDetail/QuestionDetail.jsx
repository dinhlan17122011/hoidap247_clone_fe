import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, CircularProgress, Alert, Divider, Avatar } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import useUser from '../../hooks/useUser'; // Import hook useUser
import axiosClient from '../../api/axiosClient'; // Import axios client

const QuestionDetail = () => {
    const { slug } = useParams();
    const [question, setQuestion] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Sử dụng hook useUser khi đã có question và userId
    const { user: questionUser, loading: userLoading, error: userError } = useUser(question?.userId);

    useEffect(() => {
        const fetchQuestion = async () => {
            try {
                setLoading(true);
                const response = await axiosClient.get(`/question/${slug}`);
                setQuestion(response.data[0]);
            } catch (err) {
                console.error('❌ Lỗi:', err);
                setError(err.response?.data?.message || 'Không tải được dữ liệu câu hỏi');
            } finally {
                setLoading(false);
            }
        };

        fetchQuestion();
    }, [slug]);

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" mt={4}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box mt={4}>
                <Alert severity="error">{error}</Alert>
            </Box>
        );
    }

    if (!question) {
        return (
            <Box mt={4} textAlign="center">
                <Typography variant="h6">Không tìm thấy câu hỏi</Typography>
            </Box>
        );
    }

    return (
        <Box p={4} maxWidth="800px" margin="0 auto">
            {/* Phần thông tin user */}
            <Box display="flex" alignItems="center" gap={2} mb={2}>
                {userLoading ? (
                    <CircularProgress size={24} />
                ) : userError ? (
                    <Avatar>
                        <AccountCircleIcon />
                    </Avatar>
                ) : (
                    <Avatar src={questionUser?.avatar}>
                        {questionUser?.username?.charAt(0) || <AccountCircleIcon />}
                    </Avatar>
                )}
                <Box>
                    <Typography variant="body1" fontWeight="bold" color="primary">
                        {userLoading ? 'Đang tải...' : questionUser?.username || 'Ẩn danh'}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {new Date(question.createdAt).toLocaleString()}
                    </Typography>
                </Box>
            </Box>

            <Divider sx={{ my: 3 }} />

            {/* Tiêu đề câu hỏi */}
            <Typography variant="h5" component="h1" gutterBottom>
                {question.subject}
            </Typography>

            {/* Nội dung câu hỏi */}
            <Typography
                variant="body1"
                color="text.primary"
                sx={{
                    mt: 2,
                    whiteSpace: 'pre-line',
                    lineHeight: 1.6,
                }}
            >
                {question.content}
            </Typography>
        </Box>
    );
};

export default QuestionDetail;
