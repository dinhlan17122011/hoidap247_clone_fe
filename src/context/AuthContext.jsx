import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Kiểm tra localStorage để cập nhật state user
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
