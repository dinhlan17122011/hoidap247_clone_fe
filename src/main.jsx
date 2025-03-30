import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { GoogleOAuthProvider } from '@react-oauth/google';

const id = '927599736011-rnvr6gch31isgg1bmarcje576841889m.apps.googleusercontent.com';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <GoogleOAuthProvider clientId={id}>
            <App />
        </GoogleOAuthProvider>
        ,
    </StrictMode>,
);
