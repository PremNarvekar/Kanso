const ResultCard = ({ shortened, handleCopy, isCopied }) => {
    if (!shortened) return null;

    return (
        <div className="mt-10 animate-fade-in px-2">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-6 rounded-2xl bg-white/40 border border-[#373737]/5 backdrop-blur-sm">
                <div className="flex flex-col text-center md:text-left">
                    <span className="text-[10px] text-[#373737]/40 uppercase tracking-[0.2em] mb-1">
                        Generated Link
                    </span>
                    <a
                        href="#"
                        className="text-[#373737] font-medium text-xl hover:text-[#7FAB4F] transition-colors decoration-[#7FAB4F]/30 underline underline-offset-8"
                    >
                        {shortened}
                    </a>
                </div>
                <button
                    onClick={handleCopy}
                    className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${isCopied
                            ? "bg-[#7FAB4F] text-white shadow-md shadow-[#7FAB4F]/20"
                            : "bg-white text-[#373737] hover:bg-[#FCFBF4] border border-[#373737]/10"
                        }`}
                >
                    {isCopied ? "Copied" : "Copy"}
                </button>
            </div>
        </div>
    );
};

export default ResultCard;
