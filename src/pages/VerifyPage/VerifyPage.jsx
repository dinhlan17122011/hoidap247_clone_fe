import { useState, useEffect } from 'react';
import { Navigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';

const VerifyPage = () => {
    const [searchParams] = useSearchParams();
    const emailFromQuery = searchParams.get('email') || '';

    const [email, setEmail] = useState(emailFromQuery);
    const [verificationCode, setVerificationCode] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (emailFromQuery) setEmail(emailFromQuery);
    }, [emailFromQuery]);

    const handleVerify = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            const res = await axios.post('http://localhost:3000/api/user/verifyEmail', { email, verificationCode });

            setMessage(res.data.message);

            setTimeout(() => Navigate("/login"), 2000)
        } catch (error) {
            setMessage(error.response?.data?.message || 'Lỗi máy chủ, vui lòng thử lại!');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-bold mb-4">Xác Thực Tài Khoản</h2>

                {message && <p className="mb-4 text-red-500">{message}</p>}

                <form onSubmit={handleVerify} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium">Email:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-3 py-2 border rounded-lg"
                            disabled
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Mã xác thực:</label>
                        <input
                            type="text"
                            value={verificationCode}
                            onChange={(e) => setVerificationCode(e.target.value)}
                            required
                            className="w-full px-3 py-2 border rounded-lg"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
                        disabled={loading}
                    >
                        {loading ? 'Đang xác thực...' : 'Xác Thực'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default VerifyPage;
