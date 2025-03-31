import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Card, CardContent, Box, Avatar, Typography, Button, CircularProgress, Alert, Divider } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const API_URL = 'http://localhost:3000';

const SearchResults = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get('q');

    console.log('🔍 Query từ URL:', query);

    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (query) {
            axios
                .get(`${API_URL}/api/question/${encodeURIComponent(query)}`)
                .then((res) => {
                    console.log('📌 Kết quả API:', res.data);

                    if (Array.isArray(res.data)) {
                        setResults(res.data);
                    } else {
                        setResults([res.data]);
                    }

                    setLoading(false);
                })
                .catch((err) => {
                    console.error('❌ Lỗi API:', err);
                    if (err.response && err.response.status === 404) {
                        setError('Không tìm thấy câu hỏi.');
                    } else {
                        setError('Đã có lỗi xảy ra, vui lòng thử lại.');
                    }
                    setLoading(false);
                });
        }
    }, [query]);

    if (loading) return <CircularProgress />;
    if (error) return <Alert severity="error">{error}</Alert>;

    return (
        <Box p={4}>
            <Typography variant="h5" fontWeight="bold" mb={2} color="primary">
                Kết quả tìm kiếm cho: "{query}"
            </Typography>

            {loading ? (
                <Box display="flex" justifyContent="center" mt={3}>
                    <CircularProgress />
                </Box>
            ) : error ? (
                <Box display="flex" justifyContent="center" mt={3}>
                    <Alert severity="error">{error}</Alert>
                </Box>
            ) : results.length > 0 ? (
                <Box display="flex" flexDirection="column" gap={2}>
                    {results.map((question, index) => (
                        <Card
                            key={question._id ? `question-${question._id}` : `index-${index}`}
                            sx={{
                                borderRadius: 3,
                                boxShadow: 3,
                                border: '1px solid #e0e0e0',
                                transition: 'all 0.3s ease-in-out',
                                '&:hover': {
                                    boxShadow: 6,
                                    transform: 'scale(1.02)',
                                },
                            }}
                        >
                            <CardContent>
                                {/* Header */}
                                <Box display="flex" alignItems="center" gap={2} mb={1}>
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

                                <Divider sx={{ my: 1 }} />

                                {/* Tiêu đề câu hỏi */}
                                <Typography variant="h6" fontWeight="bold" color="text.primary" sx={{ mb: 1 }}>
                                    {question.title}
                                </Typography>

                                {/* Nội dung câu hỏi */}
                                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                    {question.content.length > 150
                                        ? `${question.content.slice(0, 150)}...`
                                        : question.content}
                                </Typography>

                                {/* Nút trả lời */}
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="small"
                                    sx={{ borderRadius: 2, textTransform: 'none' }}
                                >
                                    Trả lời
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </Box>
            ) : (
                <Typography textAlign="center" color="text.secondary">
                    Không tìm thấy kết quả nào.
                </Typography>
            )}
        </Box>
    );
};

export default SearchResults;
