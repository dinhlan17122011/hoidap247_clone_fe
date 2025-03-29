import { createContext, useContext, useState, useEffect } from 'react';
import axiosClient from '../api/axiosClient';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        
        if (token) {
            axiosClient.get('/user/me', {
                headers: { Authorization: `Bearer ${token}` }
            })
            .then(res => {
                setUser(res.data);
                localStorage.setItem('user', JSON.stringify(res.data));
            })
            .catch(() => {
                setUser(null);
                localStorage.removeItem('user');
            });
        }
    }, []);

    return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
