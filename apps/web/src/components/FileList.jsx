"use client";

import { FileImage, FileText, ChevronUp, ChevronDown } from "lucide-react";

export default function FileList({
  files,
  selectedFile,
  onFileSelect,
  sortBy,
  sortOrder,
  onSort,
}) {
  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const getFileIcon = (fileName) => {
    const extension = fileName.toLowerCase().slice(fileName.lastIndexOf("."));
    if ([".png", ".jpg", ".jpeg", ".tiff", ".tif"].includes(extension)) {
      return <FileImage className="w-5 h-5 text-cyan-400" />;
    } else if (extension === ".pdf") {
      return <FileText className="w-5 h-5 text-rose-400" />;
    }
    return <FileText className="w-5 h-5 text-slate-500" />;
  };

  const getSortIcon = (field) => {
    if (sortBy !== field) return null;
    return sortOrder === "asc" ? (
      <ChevronUp className="w-3.5 h-3.5 text-emerald-400" />
    ) : (
      <ChevronDown className="w-3.5 h-3.5 text-emerald-400" />
    );
  };

  const formatLastModified = (timestamp) => {
    return new Date(timestamp).toLocaleDateString();
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-slate-800/80 bg-slate-900/30">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-heading font-semibold text-sm text-slate-200 uppercase tracking-wider">Files</h2>
          <span className="text-xs text-slate-500 font-heading bg-slate-800/60 px-2.5 py-1 rounded-full">{files.length} files</span>
        </div>

        {/* Column Headers */}
        <div className="grid grid-cols-12 gap-4 text-[11px] font-semibold text-slate-500 uppercase tracking-widest">
          <div
            className="col-span-5 flex items-center gap-1.5 cursor-pointer hover:text-slate-300 transition-colors duration-200"
            onClick={() => onSort("name")}
          >
            Name
            {getSortIcon("name")}
          </div>
          <div
            className="col-span-3 flex items-center gap-1.5 cursor-pointer hover:text-slate-300 transition-colors duration-200"
            onClick={() => onSort("size")}
          >
            Size
            {getSortIcon("size")}
          </div>
          <div className="col-span-2">Type</div>
          <div className="col-span-2">Modified</div>
        </div>
      </div>

      {/* File List */}
      <div className="flex-1 overflow-auto">
        {files.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center p-6 animate-fade-in">
            <div className="w-16 h-16 bg-slate-800/80 rounded-2xl flex items-center justify-center mb-4 border border-slate-700/50">
              <FileImage className="w-8 h-8 text-slate-600" />
            </div>
            <p className="text-slate-400 text-sm mb-1 font-medium">No files found</p>
            <p className="text-xs text-slate-600">
              Select a folder containing images or PDFs to get started
            </p>
          </div>
        ) : (
          <div className="divide-y divide-slate-800/50">
            {files.map((file, index) => (
              <div
                key={index}
                className={`grid grid-cols-12 gap-4 px-4 py-3 cursor-pointer transition-all duration-150 ${
                  selectedFile === file
                    ? "bg-emerald-500/8 border-l-[3px] border-l-emerald-400 pl-[13px]"
                    : "hover:bg-slate-800/40 border-l-[3px] border-l-transparent pl-[13px]"
                }`}
                style={selectedFile === file ? { animationDelay: '0ms' } : {}}
                onClick={() => onFileSelect(file)}
              >
                <div className="col-span-5 flex items-center gap-3 min-w-0">
                  {getFileIcon(file.name)}
                  <span className="text-sm font-medium text-slate-200 truncate">
                    {file.name}
                  </span>
                </div>

                <div className="col-span-3 flex items-center">
                  <span className="text-sm text-slate-400 font-heading text-xs">
                    {formatFileSize(file.size)}
                  </span>
                </div>

                <div className="col-span-2 flex items-center">
                  <span className="text-[11px] text-slate-500 uppercase font-heading bg-slate-800/40 px-2 py-0.5 rounded">
                    {file.name.split(".").pop()}
                  </span>
                </div>

                <div className="col-span-2 flex items-center">
                  <span className="text-xs text-slate-500">
                    {formatLastModified(file.lastModified)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Selection Info */}
      {selectedFile && (
        <div className="p-4 border-t border-slate-800/80 bg-emerald-500/5 animate-fade-in">
          <div className="text-sm">
            <p className="font-medium text-emerald-300 truncate font-heading text-[13px]">
              {selectedFile.name}
            </p>
            <p className="text-emerald-400/60 text-xs mt-0.5">{formatFileSize(selectedFile.size)}</p>
          </div>
        </div>
      )}
    </div>
  );
}
