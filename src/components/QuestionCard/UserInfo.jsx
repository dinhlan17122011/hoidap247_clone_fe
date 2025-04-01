import React from 'react';
import { Avatar, Box, CircularProgress, Typography } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import useUser from '../../hooks/useUser.js';

const UserInfo = ({ userId, createdAt }) => {
    const { user, loading, error } = useUser(userId);

    return (
        <Box display="flex" alignItems="center" gap={2} mb={1}>
            {loading ? (
                <CircularProgress size={24} />
            ) : error ? (
                <Avatar>
                    <AccountCircleIcon />
                </Avatar>
            ) : (
                <Avatar src={user?.avatar}>
                    {user?.username?.charAt(0) || <AccountCircleIcon />}
                </Avatar>
            )}
            <Box>
                <Typography variant="body1" fontWeight="bold" color="primary">
                    {loading ? 'Đang tải...' : user?.username || 'Ẩn danh'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {new Date(createdAt).toLocaleString()}
                </Typography>
            </Box>
        </Box>
    );
};

export default UserInfo;