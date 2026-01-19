import { useState } from 'react'

const UrlInput = ({ url, setUrl, handleShorten, user, slug, setSlug }) => {

    return (
        <form onSubmit={handleShorten} className="w-full flex flex-col gap-4">
            <input
                type="text"
                placeholder="Paste your long link..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="flex-1 bg-white/50 border border-[#373737]/10 rounded-full px-8 py-4 text-[#373737] placeholder-[#373737]/40 focus:outline-none focus:ring-1 focus:ring-[#7FAB4F] focus:border-[#7FAB4F] transition-all shadow-sm focus:bg-white"
            />
            
            {user && (
                <div className="flex flex-col md:flex-row gap-4 items-end">
                    <input
                        type="text"
                        placeholder="Custom URL name (optional)"
                        value={slug}
                        onChange={(e) => setSlug(e.target.value)}
                        className="flex-1 bg-white/50 border border-[#373737]/10 rounded-full px-8 py-4 text-[#373737] placeholder-[#373737]/40 focus:outline-none focus:ring-1 focus:ring-[#7FAB4F] transition-all text-sm"
                    />
                    <span className="text-[#373737]/60 text-sm whitespace-nowrap">kanso.link/</span>
                </div>
            )}

            <div className="flex gap-4">
                <button
                    type="submit"
                    className="bg-[#7FAB4F] hover:bg-[#6A9140] text-white font-medium rounded-full px-10 py-4 transition-all duration-300 shadow-lg shadow-[#7FAB4F]/20 active:scale-95 whitespace-nowrap tracking-wide flex-1"
                >
                    Shorten
                </button>
            </div>
        </form>
    );
};

export default UrlInput;
