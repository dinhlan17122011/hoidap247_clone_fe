import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAuth } from '../../context/AuthContext.jsx';
import { Box, TextField, Button, Typography, Alert, CircularProgress } from '@mui/material';
import axiosClient from '../../api/axiosClient';
import { useNavigate } from 'react-router-dom';
import { FaGoogle } from 'react-icons/fa';
import axios from 'axios';
import { GoogleLogin } from '@react-oauth/google';
// Schema validation
const schema = yup.object().shape({
    email: yup.string().email('Email không hợp lệ').required('Vui lòng nhập email'),
    password: yup.string().min(6, 'Mật khẩu ít nhất 6 ký tự').required('Vui lòng nhập mật khẩu'),
});

const LoginPage = () => {
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm({ resolver: yupResolver(schema) });
    const { setUser } = useAuth();
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            const response = await axiosClient.post('/user/login', data);
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            setUser(response.data.user);
            setSuccessMessage('Đăng nhập thành công! Chuyển hướng...');
            setTimeout(() => navigate('/'), 2000);
        } catch (error) {
            setError('email', { type: 'manual', message: error.response?.data?.message || 'Đăng nhập thất bại' });
        }
    };

    // Xử lý đăng nhập Google thành công
    const handleGoogleSuccess = async (response) => {
        try {
            console.log('Google login response:', response);

            const { credential } = response;
            if (!credential) {
                console.error('Google credential is missing');
                return;
            }

            const res = await axios.post('http://localhost:3000/api/auth/google/callback', {
                tokenId: credential,
            });

            if (res.data.success) {
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('user', JSON.stringify(res.data.user));
                setUser(res.data.user);
                navigate('/');
            } else {
                console.error('Lỗi đăng nhập Google:', res.data.message);
            }
        } catch (error) {
            console.error('Lỗi khi đăng nhập Google:', error);
        }
    };

    return (
        <Box width={400} mx="auto" mt={5} p={3} boxShadow={3} borderRadius={2}>
            <Typography variant="h5" fontWeight="bold" mb={2}>
                Đăng nhập
            </Typography>

            {successMessage && <Alert severity="success">{successMessage}</Alert>}
            {errors.email && <Alert severity="error">{errors.email.message}</Alert>}

            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    label="Email"
                    fullWidth
                    margin="normal"
                    {...register('email')}
                    error={!!errors.email}
                    helperText={errors.email?.message}
                />
                <TextField
                    label="Mật khẩu"
                    type="password"
                    fullWidth
                    margin="normal"
                    {...register('password')}
                    error={!!errors.password}
                    helperText={errors.password?.message}
                />

                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ mt: 2 }}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? <CircularProgress size={24} color="inherit" /> : 'Đăng nhập'}
                </Button>
            </form>

            <Box mt={3}>
                    <GoogleLogin
                        onSuccess={handleGoogleSuccess}
                        onError={() => console.error('Login failed')}
                        auto_select={false} // Tắt auto-login, tránh mở trang khác ngoài popup
                    />
            </Box>
        </Box>
    );
};

export default LoginPage;
