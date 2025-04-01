import React from 'react';
import { Box, Button, Card, CardContent, Typography, CircularProgress, Alert, Divider } from '@mui/material';
import { Link } from 'react-router-dom';
import useQuestions from '../../hooks/useQuestions.js';
import UserInfo from './UserInfo'; // Import component mới

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
                    to={`/question/${question.slug}`}
                    sx={{
                        borderRadius: 3,
                        boxShadow: 3,
                        border: '1px solid #e0e0e0',
                        transition: 'all 0.3s ease-in-out',
                        '&:hover': {
                            boxShadow: 6,
                            transform: 'scale(1.02)',
                            textDecoration: 'none',
                            cursor: 'pointer',
                        },
                        textDecoration: 'none',
                    }}
                >
                    <CardContent>
                        {/* Sử dụng component UserInfo */}
                        <UserInfo userId={question.userId} createdAt={question.createdAt} />

                        <Divider sx={{ my: 1 }} />
                        
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                            {question.content.length > 150 ? `${question.content.slice(0, 150)}...` : question.content}
                        </Typography>

                        <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            sx={{ borderRadius: 2, textTransform: 'none' }}
                            onClick={(e) => e.preventDefault()}
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