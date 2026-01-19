const Navbar = ({ onMenuClick }) => {
    return (
        <nav className="w-full flex justify-between items-center py-8 px-6 md:px-12 relative z-30">
            {/* Menu Trigger */}
            <button
                onClick={onMenuClick}
                className="w-10 h-10 rounded-full flex flex-col justify-center items-center gap-1.5 hover:bg-[#373737]/5 transition-colors group"
            >
                <span className="w-5 h-0.5 bg-[#373737] group-hover:bg-[#7FAB4F] transition-colors"></span>
                <span className="w-5 h-0.5 bg-[#373737] group-hover:bg-[#7FAB4F] transition-colors"></span>
                <span className="w-5 h-0.5 bg-[#373737] group-hover:bg-[#7FAB4F] transition-colors"></span>
            </button>

            <div className="flex items-center gap-3 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="w-3 h-3 rounded-full bg-[#7FAB4F]"></div>
                <span className="text-2xl font-light tracking-widest text-[#373737] uppercase">
                    Kanso
                </span>
            </div>

            {/* Spacer to balance the flex layout */}
            <div className="w-10"></div>
        </nav>
    );
};

export default Navbar;
