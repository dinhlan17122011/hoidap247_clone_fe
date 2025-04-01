import { useState, useEffect } from 'react';
import axiosClient from '../api/axiosClient'; // Import axios client bạn đã tạo

const useUser = (userId) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                setLoading(true);
                const response = await axiosClient.get(`/user/profile/${userId}`);
                setUser(response.data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        if (userId) {
            fetchUser();
        }
    }, [userId]);

    return { user, loading, error };
};

export default useUser;
