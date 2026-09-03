"use client";

import { Search, X } from "lucide-react";

export default function SearchBar({
  value,
  onChange,
  placeholder = "Search...",
}) {
  const handleClear = () => {
    onChange("");
  };

  return (
    <div className="relative group">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="w-4 h-4 text-slate-500 group-focus-within:text-emerald-400 transition-colors duration-200" />
      </div>

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-64 pl-10 pr-10 py-2 bg-slate-800/60 backdrop-blur-sm border border-slate-700/60 rounded-lg text-sm text-slate-200 placeholder-slate-500 focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500/50 transition-all duration-200"
      />

      {value && (
        <button
          onClick={handleClear}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-500 hover:text-slate-300 cursor-pointer transition-colors duration-200"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
