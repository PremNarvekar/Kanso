import { useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { logoutUser, updateAvatar } from '../../api/user.api';

const Sidebar = ({ isOpen, onClose, onLoginClick, onRegisterClick, user, history = [] }) => {
    const queryClient = useQueryClient();

    const logoutMutation = useMutation({
        mutationFn: logoutUser,
        onSuccess: () => {
            queryClient.setQueryData(['user'], null);
            queryClient.invalidateQueries({ queryKey: ['user'] });
            queryClient.invalidateQueries({ queryKey: ['history'] });
        },
        onError: (err) => {
            console.error("Logout failed", err);
        }
    });

    const avatarMutation = useMutation({
        mutationFn: updateAvatar,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['user'] });
        },
        onError: (err) => {
            console.error("Avatar update failed", err);
        }
    });

    const handleLogout = () => {
        logoutMutation.mutate();
    }

    const handleAvatarClick = () => {
        if (!user) return;
        // Generate a random seed
        const seed = Math.random().toString(36).substring(7);
        const newAvatar = `https://api.dicebear.com/9.x/avataaars/svg?seed=${seed}`;
        avatarMutation.mutate(newAvatar);
    };

    // Prevent scrolling when sidebar is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    return (
        <>
            {/* Overlay */}
            <div
                className={`fixed inset-0 bg-[#373737]/20 backdrop-blur-sm z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    }`}
                onClick={onClose}
            ></div>

            {/* Sidebar Panel */}
            <div
                className={`fixed top-0 left-0 h-full w-80 bg-[#FFFED9] shadow-2xl z-50 transform transition-transform duration-300 ease-out flex flex-col ${isOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
            >
                {/* Header */}
                <div className="p-8 border-b border-[#373737]/10 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-[#7FAB4F]"></div>
                        <span className="text-xl font-light tracking-widest text-[#373737] uppercase">
                            Menu
                        </span>
                    </div>
                </div>

                {/* Content - History */}
                <div className="flex-1 overflow-y-auto p-6">
                    {user ? (
                        <>
                            <h3 className="text-[#373737]/60 text-sm font-medium uppercase tracking-wider mb-4">
                                History
                            </h3>
                            <div className="space-y-3">
                                {Array.isArray(history) && history.length > 0 ? (
                                    history.map((item) => (
                                        <div key={item._id} className="p-4 bg-white/50 rounded-2xl border border-[#373737]/5">
                                            <p className="text-[#373737] truncate font-medium">{item.short_url}</p>
                                            <p className="text-[#373737]/40 text-xs mt-1 truncate">{item.full_url}</p>
                                        </div>
                                    ))
                                ) : (
                                    <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-60">
                                        <p className="text-[#373737] font-light">No history yet</p>
                                    </div>
                                )}
                            </div>
                        </>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-60">
                            <p className="text-[#373737] font-light">Login to view your history</p>
                        </div>
                    )}
                </div>

                {/* Footer - Auth Buttons / User Info */}
                <div className="p-8">
                    {user ? (
                        <div className="flex items-center gap-4">
                            <div
                                className="w-12 h-12 rounded-full bg-[#7FAB4F] flex items-center justify-center text-white font-medium text-lg overflow-hidden cursor-pointer hover:opacity-80 transition-opacity relative group"
                                onClick={handleAvatarClick}
                                title="Click to change avatar"
                            >
                                {user?.avatar ? (
                                    <img src={user.avatar} alt="avatar" className="w-full h-full object-cover" />
                                ) : (
                                    <span>{user?.name?.[0] || 'U'}</span>
                                )}
                                <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                    </svg>
                                </div>
                            </div>
                            <div className="flex-1 overflow-hidden">
                                <p className="text-[#373737] font-medium truncate">{user?.name || 'User'}</p>
                                <p className="text-[#373737]/60 text-xs truncate">{user?.email || ''}</p>
                            </div>
                            <button
                                onClick={handleLogout}
                                disabled={logoutMutation.isPending}
                                className="p-2 text-[#373737]/40 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                                title="Logout"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
                                </svg>
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 gap-4">
                            <button
                                onClick={onRegisterClick}
                                className="w-full py-3 rounded-full border border-[#373737]/20 text-[#373737] font-medium hover:bg-[#373737]/5 transition-colors"
                            >
                                Register
                            </button>
                            <button
                                onClick={onLoginClick}
                                className="w-full py-3 rounded-full bg-[#7FAB4F] text-white font-medium hover:bg-[#6A9140] transition-colors shadow-lg shadow-[#7FAB4F]/20"
                            >
                                Login
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};


export default Sidebar;
