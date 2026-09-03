"use client";

import { useState, useRef } from "react";
import {
  Folder,
  FolderOpen,
  HardDrive,
  ChevronRight,
  ChevronDown,
  FolderPlus,
} from "lucide-react";

export default function FolderBrowser({ onFolderSelect, selectedFolder }) {
  const [expandedFolders, setExpandedFolders] = useState(new Set());
  const [folderTree, setFolderTree] = useState([]);
  const fileInputRef = useRef(null);

  const handleSelectFolder = async () => {
    try {
      if ("showDirectoryPicker" in window) {
        const directoryHandle = await window.showDirectoryPicker();
        onFolderSelect(directoryHandle);

        setFolderTree([
          {
            name: directoryHandle.name,
            handle: directoryHandle,
            isExpanded: true,
            children: [],
          },
        ]);
      } else {
        fileInputRef.current?.click();
      }
    } catch (error) {
      if (error.name !== "AbortError") {
        console.error("Error selecting folder:", error);
      }
    }
  };

  const handleFileInputChange = async (event) => {
    const files = Array.from(event.target.files);
    if (files.length > 0) {
      const mockFolder = {
        name: "Selected Files",
        files: files.filter((file) => {
          const extension = file.name
            .toLowerCase()
            .slice(file.name.lastIndexOf("."));
          return [".png", ".jpg", ".jpeg", ".tiff", ".tif", ".pdf"].includes(
            extension,
          );
        }),
        entries: function* () {
          for (const file of this.files) {
            yield [
              file.name,
              { kind: "file", getFile: () => Promise.resolve(file) },
            ];
          }
        },
      };
      onFolderSelect(mockFolder);
    }
  };

  const toggleFolder = (folderName) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(folderName)) {
      newExpanded.delete(folderName);
    } else {
      newExpanded.add(folderName);
    }
    setExpandedFolders(newExpanded);
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-slate-800/80">
        <div className="flex items-center gap-2 mb-4">
          <Folder className="w-5 h-5 text-emerald-400" />
          <h2 className="font-heading font-semibold text-sm text-slate-200 uppercase tracking-wider">Folders</h2>
        </div>

        <button
          onClick={handleSelectFolder}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 btn-cta rounded-lg text-sm cursor-pointer"
        >
          <FolderPlus className="w-4 h-4" />
          Select Folder
        </button>

        <input
          ref={fileInputRef}
          type="file"
          multiple
          webkitdirectory=""
          accept=".png,.jpg,.jpeg,.tiff,.tif,.pdf"
          onChange={handleFileInputChange}
          className="hidden"
        />
      </div>

      {/* Folder Tree */}
      <div className="flex-1 overflow-auto p-3">
        {folderTree.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center p-6 animate-fade-in">
            <div className="w-16 h-16 bg-slate-800/80 rounded-2xl flex items-center justify-center mb-4 border border-slate-700/50">
              <Folder className="w-8 h-8 text-slate-600" />
            </div>
            <p className="text-slate-400 text-sm mb-1 font-medium">No folder selected</p>
            <p className="text-xs text-slate-600">
              Choose a folder to begin resizing files
            </p>
          </div>
        ) : (
          <div className="space-y-1 animate-fade-in">
            {folderTree.map((folder, index) => (
              <div key={index}>
                <div
                  className={`flex items-center gap-2 p-2.5 rounded-lg cursor-pointer transition-all duration-200 ${
                    selectedFolder === folder.handle
                      ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-[0_0_12px_rgba(34,197,94,0.08)]"
                      : "hover:bg-slate-800/60 text-slate-300 border border-transparent"
                  }`}
                  onClick={() => onFolderSelect(folder.handle)}
                >
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFolder(folder.name);
                    }}
                    className="p-0.5 cursor-pointer"
                  >
                    {expandedFolders.has(folder.name) ? (
                      <ChevronDown className="w-4 h-4 text-slate-500" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-slate-500" />
                    )}
                  </button>

                  {selectedFolder === folder.handle ? (
                    <FolderOpen className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Folder className="w-4 h-4 text-slate-500" />
                  )}

                  <span className="text-sm font-medium truncate">
                    {folder.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Info */}
      {selectedFolder && (
        <div className="p-4 border-t border-slate-800/80 bg-slate-900/50">
          <div className="text-xs text-slate-500">
            <p className="mb-1">Selected folder:</p>
            <p className="font-medium text-emerald-400/80 truncate font-heading text-[13px]">
              {selectedFolder.name || "Selected Files"}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
