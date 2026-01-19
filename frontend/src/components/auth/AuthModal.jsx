import { useState, useEffect } from 'react';
import AuthHeader from './AuthHeader';
import AuthForm from './AuthForm';
import AuthToggle from './AuthToggle';

const AuthModal = ({ isOpen, onClose, initialMode = 'login', onLoginSuccess }) => {
    const [mode, setMode] = useState(initialMode);

    useEffect(() => {
        if (isOpen) {
            setMode(initialMode);
        }
    }, [isOpen, initialMode]);

    if (!isOpen) return null;

    const isLogin = mode === 'login';

    const handleAuthSuccess = (userData) => {
        if (onLoginSuccess) onLoginSuccess(userData)
        onClose()
    }

    const toggleMode = () => setMode(isLogin ? 'register' : 'login');

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-[#373737]/30 backdrop-blur-md"
                onClick={onClose}
            ></div>

            {/* Modal Card */}
            <div className="relative w-full max-w-md bg-[#FFFED9] rounded-[2.5rem] shadow-2xl overflow-hidden p-8 md:p-10 animate-in fade-in zoom-in duration-300">
                <AuthHeader isLogin={isLogin} />
                <AuthForm isLogin={isLogin} onSubmit={handleAuthSuccess} />
                <AuthToggle isLogin={isLogin} toggleMode={toggleMode} />
            </div>
        </div>
    );
};

export default AuthModal;
