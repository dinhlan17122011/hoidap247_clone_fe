import React from 'react';
import { Avatar, Box, Button, Card, CardContent, Typography, CircularProgress, Alert, Divider } from '@mui/material';
import { Link } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import useQuestions from '../../hooks/useQuestions.js';

const QuestionCard = () => {
    const { questions, loading, error } = useQuestions();

    if (loading)
        return (
            <Box display="flex" justifyContent="center" mt={3}>
                <CircularProgress />
            </Box>
        );

    if (error)
        return (
            <Box display="flex" justifyContent="center" mt={3}>
                <Alert severity="error">{error}</Alert>
            </Box>
        );

    return (
        <Box display="flex" flexDirection="column" gap={2}>
            {questions.map((question) => (
                <Card
                    key={question._id}
                    component={Link}
                    to={`/question/${question.slug}`} // Giả sử mỗi câu hỏi có trường slug
                    sx={{
                        borderRadius: 3,
                        boxShadow: 3,
                        border: '1px solid #e0e0e0',
                        transition: 'all 0.3s ease-in-out',
                        '&:hover': {
                            boxShadow: 6,
                            transform: 'scale(1.02)',
                            textDecoration: 'none', // Loại bỏ gạch chân của link
                            cursor: 'pointer',
                        },
                        textDecoration: 'none', // Loại bỏ gạch chân của link
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
                        {/* Nội dung câu hỏi */}
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                            {question.content.length > 150 ? `${question.content.slice(0, 150)}...` : question.content}
                        </Typography>

                        {/* Nút trả lời */}
                        <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            sx={{ borderRadius: 2, textTransform: 'none' }}
                            onClick={(e) => e.preventDefault()} // Ngăn chặn sự kiện click lan ra toàn bộ card
                        >
                            Trả lời
                        </Button>
                    </CardContent>
                </Card>
            ))}
        </Box>
    );
};

export default QuestionCard;
