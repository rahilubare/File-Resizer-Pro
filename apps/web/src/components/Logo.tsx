import { Scaling } from "lucide-react";

export default function Logo({ className = "", textClassName = "text-xl font-bold" }) {
    return (
        <div
            className={`flex flex-row items-center flex-nowrap gap-3 flex-shrink-0 mr-8 pr-4 ${className}`}
            style={{ width: '280px', minWidth: '280px', maxWidth: '320px' }}
        >
            <div className="relative bg-gradient-to-br from-emerald-500 to-emerald-600 p-2 rounded-xl shadow-lg animate-pulse-glow flex-shrink-0">
                <Scaling className="w-5 h-5 text-white" />
                <div className="absolute inset-0 rounded-xl bg-emerald-400/20 animate-breathe" />
            </div>
            <span className={`font-heading bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-300 whitespace-nowrap flex-shrink-0 leading-none select-none tracking-tight ${textClassName}`}>
                File Resizer Pro
            </span>
        </div>
    );
}
