import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axiosClient from '../api/axiosClient';

const GoogleAuthCallback = () => {
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');

    useEffect(() => {
        if (token) {
            localStorage.setItem('token', token);
            axiosClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            window.location.href = '/'; // Chuyển về trang chủ sau khi đăng nhập thành công
        } else {
            console.error('Google Auth thất bại');
            window.location.href = '/login';
        }
    }, [token]);

    return <p>Đang xác thực Google...</p>;
};

export default GoogleAuthCallback;
