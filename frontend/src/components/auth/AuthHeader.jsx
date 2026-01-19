const AuthHeader = ({ isLogin }) => {
    return (
        <div className="mb-8">
            <h2 className="text-3xl font-light text-[#373737]">
                {isLogin ? 'Welcome back' : 'Create account'}
            </h2>
            <p className="text-[#373737]/60 mt-2 font-light">
                {isLogin ? 'Enter your details to access your history.' : 'Start simplifying your links today.'}
            </p>
        </div>
    );
};

export default AuthHeader;
