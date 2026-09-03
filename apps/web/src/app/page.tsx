"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Folder,
  Search,
  SlidersHorizontal,
  FileImage,
} from "lucide-react";
import Logo from "@/components/Logo";
import FolderBrowser from "@/components/FolderBrowser";
import FileList from "@/components/FileList";
import PreviewPanel from "@/components/PreviewPanel";
import SearchBar from "@/components/SearchBar";
import FilterPanel from "@/components/FilterPanel";
import StatusBar from "@/components/StatusBar";

export const meta = () => {
  return [
    { title: "File Resizer Pro" },
    { name: "description", content: "Professional file resizing and compression." },
  ];
};

export default function FileResizerApp() {
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sizeFilter, setSizeFilter] = useState({ min: 0, max: Infinity });
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [showFilters, setShowFilters] = useState(false);
  const [resizeSettings, setResizeSettings] = useState({
    autoOptimize: false,
    quality: 80,
    maxWidth: 1920,
    maxHeight: 1080,
    format: "original",
  });
  const [totalSavings, setTotalSavings] = useState(0);
  const [processedCount, setProcessedCount] = useState(0);

  useEffect(() => {
    document.title = "File Resizer Pro";
  }, []);

  const supportedTypes = [".png", ".jpg", ".jpeg", ".tiff", ".tif", ".pdf"];

  const handleFolderSelect = useCallback(async (folderHandle) => {
    setSelectedFolder(folderHandle);
    setSelectedFile(null);
    setTotalSavings(0);
    setProcessedCount(0);

    try {
      const fileList = [];
      for await (const [name, handle] of folderHandle.entries()) {
        if (handle.kind === "file") {
          const extension = name.toLowerCase().slice(name.lastIndexOf("."));
          if (supportedTypes.includes(extension)) {
            const file = await handle.getFile();
            fileList.push({
              name: file.name,
              size: file.size,
              type: file.type,
              lastModified: file.lastModified,
              handle,
              file,
            });
          }
        }
      }
      setFiles(fileList);
    } catch (error) {
      console.error("Error reading folder:", error);
    }
  }, []);

  const filteredAndSortedFiles = useCallback(() => {
    let filtered = files.filter((file) => {
      const matchesSearch = file.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesSize =
        file.size >= sizeFilter.min && file.size <= sizeFilter.max;
      return matchesSearch && matchesSize;
    });

    filtered.sort((a, b) => {
      let comparison = 0;
      if (sortBy === "name") {
        comparison = a.name.localeCompare(b.name);
      } else if (sortBy === "size") {
        comparison = a.size - b.size;
      }
      return sortOrder === "desc" ? -comparison : comparison;
    });

    return filtered;
  }, [files, searchTerm, sizeFilter, sortBy, sortOrder]);

  const handleFileSelect = (file) => {
    // Hard limit: 150MB (buffer OOM threshold)
    if (file.size > 157286400) {
      alert(`The file "${file.name}" is too large (${(file.size / 1024 / 1024).toFixed(1)} MB). Please select a file under 150MB to prevent server crashes.`);
      return;
    }
    setSelectedFile(file);
  };

  const handleResize = async (file, settings) => {
    try {
      const formData = new FormData();
      formData.append("file", file.file);
      formData.append("settings", JSON.stringify(settings));

      const response = await fetch("/api/resize-file", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Resize failed: ${response.statusText}`);
      }

      const originalSize = parseInt(
        response.headers.get("X-Original-Size") || "0",
      );
      const newSize = parseInt(response.headers.get("X-New-Size") || "0");
      const savings = parseInt(response.headers.get("X-Savings") || "0");
      const backupName = response.headers.get("X-Backup-Name") || "";

      const blob = await response.blob();

      const downloadUrl = window.URL.createObjectURL(blob);
      const downloadLink = document.createElement("a");
      downloadLink.href = downloadUrl;
      downloadLink.download = file.name;

      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);

      window.URL.revokeObjectURL(downloadUrl);

      setTotalSavings((prev) => prev + savings);
      setProcessedCount((prev) => prev + 1);

      console.log("File resized successfully:", {
        originalName: file.name,
        backupName: backupName,
        originalSize: originalSize,
        newSize: newSize,
        savings: savings,
      });

      return {
        success: true,
        originalSize,
        newSize,
        savings,
        backupName,
      };
    } catch (error) {
      console.error("Error resizing file:", error);
      throw error;
    }
  };

  return (
    <div className="flex flex-col h-screen gradient-bg">
      {/* Top Toolbar */}
      <div className="flex items-center justify-between px-5 py-3 toolbar-glass z-10">
        <div className="flex items-center gap-4">
          <Logo />

          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Search files..."
          />
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium transition-all duration-200 cursor-pointer ${showFilters
                ? "bg-emerald-500/15 border-emerald-500/40 text-emerald-400 shadow-[0_0_12px_rgba(34,197,94,0.15)]"
                : "bg-slate-800/40 border-slate-700/50 text-slate-400 hover:text-slate-200 hover:border-slate-600 hover:bg-slate-700/40"
              }`}
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters
          </button>
        </div>
      </div>

      {/* Filter Panel */}
      {showFilters && (
        <div className="animate-fade-in">
          <FilterPanel
            sizeFilter={sizeFilter}
            setSizeFilter={setSizeFilter}
            sortBy={sortBy}
            setSortBy={setSortBy}
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
            resizeSettings={resizeSettings}
            setResizeSettings={setResizeSettings}
          />
        </div>
      )}

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar - Folder Browser */}
        <div className="w-80 panel-surface border-r border-slate-800/80 overflow-hidden">
          <FolderBrowser
            onFolderSelect={handleFolderSelect}
            selectedFolder={selectedFolder}
          />
        </div>

        {/* Center Panel - File List */}
        <div className="flex-1 panel-surface border-r border-slate-800/80 overflow-hidden">
          <FileList
            files={filteredAndSortedFiles()}
            selectedFile={selectedFile}
            onFileSelect={handleFileSelect}
            sortBy={sortBy}
            sortOrder={sortOrder}
            onSort={(field) => {
              if (sortBy === field) {
                setSortOrder(sortOrder === "asc" ? "desc" : "asc");
              } else {
                setSortBy(field);
                setSortOrder("asc");
              }
            }}
          />
        </div>

        {/* Right Panel - Preview */}
        <div className="w-96 panel-surface overflow-hidden">
          <PreviewPanel
            selectedFile={selectedFile}
            resizeSettings={resizeSettings}
            onResize={handleResize}
            onNext={() => {
              const currentIndex = filteredAndSortedFiles().findIndex(
                (f) => f === selectedFile,
              );
              const nextFile = filteredAndSortedFiles()[currentIndex + 1];
              if (nextFile) {
                setSelectedFile(nextFile);
              }
            }}
          />
        </div>
      </div>

      {/* Status Bar */}
      <StatusBar
        totalFiles={files.length}
        filteredFiles={filteredAndSortedFiles().length}
        totalSavings={totalSavings}
        processedCount={processedCount}
      />
    </div>
  );
}
