import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Box, TextField, Button, Typography, Alert, CircularProgress } from '@mui/material';
import axiosClient from '../../api/axiosClient';
import { useNavigate } from 'react-router-dom';

// Schema validation
const schema = yup.object().shape({
    username: yup.string().required('Vui lòng nhập tên'),
    email: yup.string().email('Email không hợp lệ').required('Vui lòng nhập email'),
    password: yup.string().min(6, 'Mật khẩu ít nhất 6 ký tự').required('Vui lòng nhập mật khẩu'),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('password'), null], 'Mật khẩu không khớp')
        .required('Vui lòng nhập lại mật khẩu'),
});

const RegisterPage = () => {
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm({ resolver: yupResolver(schema) });

    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        console.log('Dữ liệu gửi lên backend:', data);
        try {
            await axiosClient.post('/user/register', {
                name: data.username,
                email: data.email,
                password: data.password,
            });

            setSuccessMessage('Đăng ký thành công! Chuyển hướng đến đăng nhập...');
            setTimeout(() => navigate(`/verify?email=${encodeURIComponent(data.email)}`), 2000); // Chuyển đến trang login sau 2s
        } catch (error) {
            console.error('Lỗi từ backend:', error.response?.data);
            setError('email', { type: 'manual', message: error.response?.data?.message || 'Đăng ký thất bại' });
        }
    };

    return (
        <Box width={400} mx="auto" mt={5} p={3} boxShadow={3} borderRadius={2}>
            <Typography variant="h5" fontWeight="bold" mb={2}>
                Đăng ký tài khoản
            </Typography>

            {successMessage && <Alert severity="success">{successMessage}</Alert>}
            {errors.email && <Alert severity="error">{errors.email.message}</Alert>}

            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    label="Tên"
                    fullWidth
                    margin="normal"
                    {...register('username')}
                    error={!!errors.name}
                    helperText={errors.name?.message}
                />
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
                <TextField
                    label="Nhập lại mật khẩu"
                    type="password"
                    fullWidth
                    margin="normal"
                    {...register('confirmPassword')}
                    error={!!errors.confirmPassword}
                    helperText={errors.confirmPassword?.message}
                />

                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ mt: 2 }}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? <CircularProgress size={24} color="inherit" /> : 'Đăng ký'}
                </Button>
            </form>
        </Box>
    );
};

export default RegisterPage;
