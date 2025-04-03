import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, CircularProgress, Alert, Divider, Avatar, Container, Chip } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import useUser from '../../hooks/useUser';
import axiosClient from '../../api/axiosClient';
import AnswerCard from './AnswerCard/AnswerCard'; // Import AnswerCard
import { useAuth } from '../../context/AuthContext';

const QuestionDetail = () => {
    const { slug } = useParams();
    const [question, setQuestion] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

     const { user } = useAuth();

    const { user: questionUser, loading: userLoading } = useUser(question?.userId);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await axiosClient.get(`/question/${slug}`);
                setQuestion(response.data[0]); // Giả sử API trả về mảng, lấy phần tử đầu tiên
            } catch (err) {
                setError(err.response?.data?.message || 'Không tải được dữ liệu');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [slug]); // Chỉ phụ thuộc vào slug
    const decodeHTML = (str) => {
        const doc = new DOMParser().parseFromString(str, 'text/html');
        return doc.body.textContent || '';
    };

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
        <Container maxWidth="md">
            {/* Phần câu hỏi */}
            <Box p={3} sx={{ backgroundColor: 'background.paper', borderRadius: 2, mt: 3 }}>
                <Box display="flex" alignItems="center" gap={2} mb={2}>
                    {userLoading ? (
                        <CircularProgress size={24} />
                    ) : (
                        <Avatar src={questionUser?.avatar}>
                            {questionUser?.username?.charAt(0) || <AccountCircleIcon />}
                        </Avatar>
                    )}
                    <Box>
                        <Typography variant="subtitle1" fontWeight="bold">
                            {userLoading ? 'Đang tải...' : questionUser?.username || 'Ẩn danh'}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                            {new Date(question.createdAt).toLocaleString('vi-VN')}
                        </Typography>
                    </Box>
                </Box>

                <Typography variant="body1" whiteSpace="pre-line" lineHeight={1.6} paragraph>
                    {decodeHTML(question.content)}
                </Typography>

                {question.tags?.length > 0 && (
                    <Box mb={2}>
                        {question.tags.map((tag) => (
                            <Chip key={tag} label={tag} size="small" sx={{ mr: 1, mb: 1 }} />
                        ))}
                    </Box>
                )}
            </Box>
            {user && (
        <button className="w-full p-4 text-white bg-yellow-500 rounded-full hover:bg-yellow-600" >
          <a href="/addQuestion">Trả lời</a>
        </button>
      )}

            {/* Phần câu trả lời */}
            <Box mt={4}>
                <Typography variant="h6" fontWeight="bold">
                    Câu trả lời
                </Typography>
                <AnswerCard userId={question.userId} questionId={question._id} /> {/* Truyền đúng _id vào AnswerCard */}
            </Box>
        </Container>
    );
};

export default QuestionDetail;
