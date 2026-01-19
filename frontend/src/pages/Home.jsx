import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import UrlInput from '../components/ui/UrlInput';
import ResultCard from '../components/ui/ResultCard';
import Sidebar from '../components/layout/Sidebar';
import AuthModal from '../components/auth/AuthModal';
import { getCurrentUser } from '../api/user.api';
import { getHistory, createShortUrl } from '../api/shortUrl.api';

const Home = () => {
    const queryClient = useQueryClient();
    const [url, setUrl] = useState('');
    const [slug, setSlug] = useState('');
    const [shortened, setShortened] = useState('');
    const [isCopied, setIsCopied] = useState(false);

    // Auth & Sidebar State
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isAuthOpen, setIsAuthOpen] = useState(false);
    const [authMode, setAuthMode] = useState('login');

    // Queries
    const { data: userData } = useQuery({
        queryKey: ['user'],
        queryFn: getCurrentUser,
        retry: false,
    });
    const user = userData?.user;

    const { data: historyData } = useQuery({
        queryKey: ['history', user?.email],
        queryFn: getHistory,
        enabled: !!user,
    });
    const history = historyData?.urls || [];

    // Mutations
    const shortenMutation = useMutation({
        mutationFn: createShortUrl,
        onSuccess: (data) => {
            setShortened(data.shortUrl || data);
            setUrl('');
            setSlug('');
            queryClient.invalidateQueries({ queryKey: ['history'] });
        },
        onError: (err) => {
            console.error('Error creating short URL:', err);
        }
    });

    const handleShorten = (e) => {
        e.preventDefault();
        if (!url) return;
        shortenMutation.mutate({ url, slug: slug || undefined });
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(shortened);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    };

    // Sidebar Handlers
    const handleMenuClick = () => setIsSidebarOpen(true);
    const handleCloseSidebar = () => setIsSidebarOpen(false);

    // Auth Handlers
    const handleLoginClick = () => {
        setAuthMode('login');
        setIsSidebarOpen(false);
        setIsAuthOpen(true);
    };

    const handleRegisterClick = () => {
        setAuthMode('register');
        setIsSidebarOpen(false);
        setIsAuthOpen(true);
    };

    const handleLoginSuccess = () => {
        queryClient.invalidateQueries({ queryKey: ['user'] });
        setIsAuthOpen(false);
    };

    return (
        <div className="min-h-screen bg-[#FFFED9] text-[#373737] font-['Outfit'] flex flex-col items-center selection:bg-[#7FAB4F] selection:text-white overflow-x-hidden">
            <Navbar onMenuClick={handleMenuClick} />

            <Sidebar
                isOpen={isSidebarOpen}
                onClose={handleCloseSidebar}
                onLoginClick={handleLoginClick}
                onRegisterClick={handleRegisterClick}
                user={user}
                history={history}
            />

            <AuthModal
                isOpen={isAuthOpen}
                onClose={() => setIsAuthOpen(false)}
                initialMode={authMode}
                onLoginSuccess={handleLoginSuccess}
            />

            <main className="flex-1 w-full max-w-2xl px-6 flex flex-col items-center justify-center -mt-16 relative z-10">
                <div className="text-center mb-12 space-y-4">
                    <h1 className="text-5xl md:text-6xl font-thin text-[#373737] tracking-tight">
                        Simplify.
                    </h1>
                    <p className="text-[#373737]/60 text-lg max-w-sm mx-auto leading-relaxed font-light">
                        Bring clarity to your links. <br />
                        Focus on what matters.
                    </p>
                </div>

                <div className="w-full">
                    <UrlInput url={url} setUrl={setUrl} handleShorten={handleShorten} user={user} slug={slug} setSlug={setSlug} />
                    <ResultCard shortened={shortened} handleCopy={handleCopy} isCopied={isCopied} />
                </div>
            </main>

            <Footer user={user} />
        </div>
    );
};

export default Home;
