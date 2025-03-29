import React from "react";
import { Avatar, Box, Button, Card, CardContent, Typography, CircularProgress, Alert } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import useQuestions from "../../hooks/useQuestions.js";

const QuestionCard = () => {
  const { questions, loading, error } = useQuestions();

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <>
      {questions.map((question) => (
        <Card key={question._id} sx={{ borderRadius: 2, boxShadow: 2, border: "1px solid #ddd", mb: 2 }}>
          <CardContent>
            {/* Header */}
            <Box display="flex" alignItems="center" gap={1}>
              <Avatar src="https://randomuser.me/api/portraits/women/44.jpg">
                <AccountCircleIcon />
              </Avatar>
              <Box>
                <Typography variant="body1" fontWeight="bold">
                  {question.subject}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {new Date(question.createdAt).toLocaleString()}
                </Typography>
              </Box>
            </Box>

            {/* Nội dung câu hỏi */}
            <Typography variant="body2" color="text.primary" sx={{ mt: 1, mb: 2 }}>
              {question.content}
            </Typography>

            {/* Nút trả lời */}
            <Button variant="outlined" size="small">
              Trả lời
            </Button>
          </CardContent>
        </Card>
      ))}
    </>
  );
};

export default QuestionCard;
