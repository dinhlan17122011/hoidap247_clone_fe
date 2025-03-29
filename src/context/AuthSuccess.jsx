import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axiosClient from '../api/axiosClient';

const AuthSuccess = () => {
    const navigate = useNavigate();
    const { setUser } = useAuth();

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const token = params.get('token');

        if (token) {
            localStorage.setItem('token', token);

            // Gọi API lấy thông tin user từ backend
            axiosClient.get('/user/me', {
                headers: { Authorization: `Bearer ${token}` }
            })
            .then(response => {
                const userData = response.data;
                localStorage.setItem('user', JSON.stringify(userData)); // Lưu user vào localStorage
                setUser(userData); // Cập nhật user trong context
                navigate('/'); // Chuyển hướng về trang chủ
            })
            .catch(error => {
                console.error('Lỗi khi lấy thông tin user:', error);
                navigate('/login'); // Nếu lỗi thì chuyển hướng về trang đăng nhập
            });
        } else {
            navigate('/login'); // Nếu không có token thì quay lại trang đăng nhập
        }
    }, [navigate, setUser]);

    return <div>Đang đăng nhập...</div>;
};

export default AuthSuccess;
