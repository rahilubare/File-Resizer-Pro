"use client";

import { FileImage, TrendingDown, CheckCircle, Clock, Activity } from "lucide-react";

export default function StatusBar({
  totalFiles,
  filteredFiles,
  totalSavings,
  processedCount,
}) {
  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const getProgressPercent = () => {
    if (filteredFiles === 0) return 0;
    return Math.round((processedCount / filteredFiles) * 100);
  };

  return (
    <div className="bg-slate-900/90 backdrop-blur-sm border-t border-slate-800/60 px-5 py-2.5">
      {/* Gradient top edge */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent" />

      <div className="flex items-center justify-between relative">
        {/* Left side - File counts */}
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-2">
            <FileImage className="w-3.5 h-3.5 text-slate-500" />
            <span className="text-xs text-slate-400 font-heading">
              <span className="text-slate-300 font-semibold">{filteredFiles}</span>
              <span className="text-slate-600 mx-1">/</span>
              <span>{totalFiles}</span>
              <span className="text-slate-600 ml-1">files</span>
            </span>
          </div>

          {processedCount > 0 && (
            <div className="flex items-center gap-2">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-xs text-slate-400 font-heading">
                <span className="text-emerald-400 font-semibold">{processedCount}</span>
                <span className="text-slate-600 ml-1">processed</span>
                <span className="text-slate-500 ml-1.5">({getProgressPercent()}%)</span>
              </span>
            </div>
          )}
        </div>

        {/* Center - Progress bar */}
        {processedCount > 0 && filteredFiles > 0 && (
          <div className="flex-1 max-w-xs mx-8">
            <div className="w-full bg-slate-800/60 rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-gradient-to-r from-emerald-500 to-cyan-400 h-1.5 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${getProgressPercent()}%` }}
              />
            </div>
          </div>
        )}

        {/* Right side - Savings info */}
        <div className="flex items-center gap-5">
          {totalSavings > 0 && (
            <div className="flex items-center gap-2">
              <TrendingDown className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-xs font-heading">
                <span className="text-emerald-400 font-semibold">{formatFileSize(totalSavings)}</span>
                <span className="text-slate-600 ml-1">saved</span>
              </span>
            </div>
          )}

          <div className="flex items-center gap-1.5 text-xs text-slate-600">
            <Activity className="w-3 h-3" />
            <span className="font-heading">Ready</span>
          </div>
        </div>
      </div>
    </div>
  );
}
