
const Footer = ({ user }) => {
    return (
        <footer className="w-full py-6 text-[#373737]/60 text-sm font-light flex items-center justify-between px-6">
            <div className="flex items-center gap-3">
                {user ? (
                    <>
                        <img src={user.avatar} alt="avatar" className="w-8 h-8 rounded-full" />
                        <span className="text-[#373737] font-medium">{user.name}</span>
                    </>
                ) : (
                    <p className="opacity-80">&copy; {new Date().getFullYear()} Kanso.</p>
                )}
            </div>
            <div className="opacity-80">Simplicity in every link.</div>
        </footer>
    );
};

export default Footer;
