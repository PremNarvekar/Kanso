const AuthToggle = ({ isLogin, toggleMode }) => {
    return (
        <div className="mt-8 text-center">
            <p className="text-sm text-[#373737]/60">
                {isLogin ? "Don't have an account?" : "Already have an account?"}
                <button
                    onClick={toggleMode}
                    className="ml-2 font-medium text-[#7FAB4F] hover:underline cursor-pointer"
                >
                    {isLogin ? 'Register' : 'Login'}
                </button>
            </p>
        </div>
    );
};

export default AuthToggle;
