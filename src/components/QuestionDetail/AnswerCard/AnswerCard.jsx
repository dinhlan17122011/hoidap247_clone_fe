import React from 'react';
import { Box, Typography, Avatar, CircularProgress, Divider, Paper } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const AnswerCard = ({ userId, questionId }) => {
    console.log(userId);
    console.log(questionId);

    return (
        <Paper
            elevation={3}
            sx={{
                maxWidth: 500,
                padding: 3,
                borderRadius: 2,
                backgroundColor: '#f5f5f5',
                fontFamily: 'Arial, sans-serif',
            }}
        >
            
        </Paper>
    );
};

export default AnswerCard;
