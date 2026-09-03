"use client";

import { useState, useRef, useEffect } from "react";
import { Eye, Download, ArrowRight, Settings, RotateCcw, Maximize2 } from "lucide-react";

export default function PreviewPanel({
  selectedFile,
  resizeSettings,
  onResize,
  onNext,
}) {
  const [originalPreview, setOriginalPreview] = useState(null);
  const [resizedPreview, setResizedPreview] = useState(null);
  const [estimatedSize, setEstimatedSize] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const canvasRef = useRef(null);
  const fetchTimeoutRef = useRef(null);
  const fetchAbortControllerRef = useRef(null);

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const getSavingsPercent = () => {
    if (!selectedFile || !estimatedSize) return 0;
    return Math.round((1 - estimatedSize / selectedFile.size) * 100);
  };

  useEffect(() => {
    if (!selectedFile) {
      setOriginalPreview(null);
      setResizedPreview(null);
      setEstimatedSize(null);
      return;
    }

    const url = URL.createObjectURL(selectedFile.file);
    setOriginalPreview(url);

    // 1. Fast Local Visual Preview
    if (selectedFile.file.type.startsWith("image/")) {
      generateResizedPreview(selectedFile.file);
    } else {
      setResizedPreview(url); // For PDFs
    }

    // 2. Debounced Exact Backend Size Fetch
    setEstimatedSize(selectedFile.file.size); // Temporary loading state

    if (fetchTimeoutRef.current) clearTimeout(fetchTimeoutRef.current);
    if (fetchAbortControllerRef.current) fetchAbortControllerRef.current.abort();
    
    fetchAbortControllerRef.current = new AbortController();
    const { signal } = fetchAbortControllerRef.current;

    fetchTimeoutRef.current = setTimeout(() => {
      const isPdf = selectedFile.file.type === "application/pdf";
      const endpoint = isPdf ? "/api/preview-pdf" : "/api/resize-file?preview=true";
      
      const fd = new FormData();
      fd.append("file", selectedFile.file);
      if (!isPdf) fd.append("settings", JSON.stringify(resizeSettings));

      fetch(endpoint, { method: "POST", body: fd, signal })
        .then(res => res.json())
        .then(data => {
          if (data && data.compressedSize) {
            setEstimatedSize(data.compressedSize);
          }
        })
        .catch(err => {
          if (err.name === 'AbortError') return;
          console.warn("Could not fetch precise preview size", err);
          if (isPdf) {
            setEstimatedSize(Math.floor(selectedFile.file.size * 0.97));
          }
        });
    }, 300);

    return () => {
      if (originalPreview) {
        URL.revokeObjectURL(originalPreview);
      }
      if (resizedPreview && resizedPreview !== originalPreview) {
        URL.revokeObjectURL(resizedPreview);
      }
    };
  }, [selectedFile, resizeSettings]);

  const generateResizedPreview = async (file) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        let { width: newWidth, height: newHeight } = calculateDimensions(
          img.width,
          img.height,
          resizeSettings.maxWidth,
          resizeSettings.maxHeight,
        );

        canvas.width = newWidth;
        canvas.height = newHeight;
        ctx.drawImage(img, 0, 0, newWidth, newHeight);

        canvas.toBlob(
          (blob) => {
            const url = URL.createObjectURL(blob);
            setResizedPreview(url);
            resolve();
          },
          file.type,
          resizeSettings.quality / 100,
        );
      };

      img.src = URL.createObjectURL(file);
    });
  };

  const calculateDimensions = (
    originalWidth,
    originalHeight,
    maxWidth,
    maxHeight,
  ) => {
    let width = originalWidth;
    let height = originalHeight;

    const scaleX = maxWidth / width;
    const scaleY = maxHeight / height;
    const scale = Math.min(scaleX, scaleY, 1);

    return {
      width: Math.round(width * scale),
      height: Math.round(height * scale),
    };
  };

  const handleResize = async () => {
    if (!selectedFile) return;

    setIsProcessing(true);
    try {
      const result = await onResize(selectedFile, resizeSettings);

      if (result.success) {
        const compressionApplied =
          result.headers?.get("X-Compression-Applied") === "true";

        if (isPDF && !compressionApplied) {
          console.log(
            "PDF processed but compression was not applied to preserve file integrity.",
          );
        } else {
          console.log("Processing completed successfully!");
        }

        setTimeout(() => {
          onNext();
          setIsProcessing(false);
        }, 1500);
      }
    } catch (error) {
      console.error("Error processing file:", error);

      let errorMessage;
      if (isPDF) {
        if (error.message.includes("Invalid PDF file")) {
          errorMessage = `The selected file (${selectedFile.name}) is not a valid PDF. Please select a different file.`;
        } else if (error.message.includes("PDF processing failed")) {
          errorMessage = `Unable to process ${selectedFile.name}. The PDF may be password-protected or corrupted.`;
        } else if (error.message.includes("network")) {
          errorMessage =
            "Network error. Please check your connection and try again.";
        } else {
          errorMessage = `Processing failed: ${error.message}`;
        }
      } else {
        errorMessage = error.message.includes("Failed to resize file")
          ? `Unable to process ${selectedFile.name}. Please try a different file.`
          : error.message.includes("network")
            ? "Network error. Please check your connection and try again."
            : `Failed to process file: ${error.message}`;
      }

      alert(errorMessage);
      setIsProcessing(false);
    }
  };

  const isImage = selectedFile?.file?.type?.startsWith("image/");
  const isPDF = selectedFile?.file?.type === "application/pdf";

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-slate-800/80">
        <div className="flex items-center gap-2">
          <Eye className="w-5 h-5 text-emerald-400" />
          <h2 className="font-heading font-semibold text-sm text-slate-200 uppercase tracking-wider">Preview</h2>
        </div>
      </div>

      {/* Preview Content */}
      <div className="flex-1 overflow-auto">
        {!selectedFile ? (
          <div className="flex flex-col items-center justify-center h-full text-center p-6 animate-fade-in">
            <div className="w-16 h-16 bg-slate-800/80 rounded-2xl flex items-center justify-center mb-4 border border-slate-700/50">
              <Maximize2 className="w-8 h-8 text-slate-600" />
            </div>
            <p className="text-slate-400 text-sm mb-1 font-medium">No file selected</p>
            <p className="text-xs text-slate-600">
              Select a file to preview and resize
            </p>
          </div>
        ) : (
          <div className="p-4 space-y-5 animate-fade-in">
            {/* Original File Preview */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Original</h3>
                <span className="text-xs text-slate-500 font-heading bg-slate-800/50 px-2 py-0.5 rounded">
                  {formatFileSize(selectedFile.size)}
                </span>
              </div>

              <div className="bg-slate-900/60 rounded-xl p-4 min-h-[180px] flex items-center justify-center border border-slate-800/60">
                {isImage && originalPreview ? (
                  <img
                    src={originalPreview}
                    alt="Original preview"
                    className="max-w-full max-h-44 object-contain rounded-lg"
                  />
                ) : isPDF && originalPreview ? (
                  <div className="w-full h-44 border border-slate-700/50 rounded-lg bg-slate-900 overflow-hidden">
                    <embed
                      src={originalPreview}
                      type="application/pdf"
                      width="100%"
                      height="100%"
                      className="rounded-lg"
                    />
                  </div>
                ) : isPDF ? (
                  <div className="text-center">
                    <div className="w-14 h-14 bg-rose-500/10 rounded-xl flex items-center justify-center mx-auto mb-2 border border-rose-500/20">
                      <Download className="w-7 h-7 text-rose-400" />
                    </div>
                    <p className="text-sm text-slate-400">{selectedFile.name}</p>
                    <p className="text-xs text-slate-600 mt-0.5">
                      Loading PDF Preview...
                    </p>
                  </div>
                ) : (
                  <div className="text-center text-slate-600">
                    <p className="text-sm">Preview not available</p>
                  </div>
                )}
              </div>
            </div>

            {/* Resize Arrow */}
            <div className="flex justify-center">
              <div className="flex items-center gap-2 px-4 py-1.5 bg-emerald-500/10 rounded-full border border-emerald-500/20">
                <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                  {isPDF ? "Compress" : "Resize"}
                </span>
              </div>
            </div>

            {/* Resized Preview */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  After Resize
                </h3>
                <span className="text-xs text-slate-500 font-heading bg-slate-800/50 px-2 py-0.5 rounded">
                  {estimatedSize
                    ? formatFileSize(estimatedSize)
                    : "Calculating..."}
                </span>
              </div>

              <div className="bg-slate-900/60 rounded-xl p-4 min-h-[180px] flex items-center justify-center border border-slate-800/60">
                {isImage && resizedPreview ? (
                  <img
                    src={resizedPreview}
                    alt="Resized preview"
                    className="max-w-full max-h-44 object-contain rounded-lg"
                  />
                ) : isPDF && resizedPreview ? (
                  <div className="w-full h-44 border border-slate-700/50 rounded-lg bg-slate-900 relative overflow-hidden">
                    <embed
                      src={resizedPreview}
                      type="application/pdf"
                      width="100%"
                      height="100%"
                      className="rounded-lg"
                    />
                    <div className="absolute top-2 right-2 bg-emerald-500/20 text-emerald-300 px-2.5 py-1 rounded-md text-xs font-semibold border border-emerald-500/30">
                      Compressed
                    </div>
                  </div>
                ) : isPDF ? (
                  <div className="text-center">
                    <div className="w-14 h-14 bg-rose-500/10 rounded-xl flex items-center justify-center mx-auto mb-2 border border-rose-500/20">
                      <Download className="w-7 h-7 text-rose-400" />
                    </div>
                    <p className="text-sm text-slate-400">{selectedFile.name}</p>
                    <p className="text-xs text-slate-600 mt-0.5">
                      PDF will be compressed
                    </p>
                  </div>
                ) : (
                  <div className="text-center text-slate-600">
                    <p className="text-sm">Preview generating...</p>
                  </div>
                )}
              </div>
            </div>

            {/* Size Comparison */}
            {estimatedSize && getSavingsPercent() > 0 && (
              <div className="bg-emerald-500/8 rounded-xl p-4 border border-emerald-500/15">
                <h4 className="text-xs font-semibold text-emerald-300 mb-2 uppercase tracking-wider">
                  Size Savings
                </h4>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-emerald-400/80">
                    {formatFileSize(selectedFile.size - estimatedSize)} saved
                  </span>
                  <span className="text-emerald-300 font-bold font-heading text-base">
                    {getSavingsPercent()}%
                  </span>
                </div>
                {/* Savings bar */}
                <div className="mt-2.5 w-full bg-slate-800/60 rounded-full h-1.5">
                  <div
                    className="bg-gradient-to-r from-emerald-500 to-cyan-400 h-1.5 rounded-full transition-all duration-500"
                    style={{ width: `${getSavingsPercent()}%` }}
                  />
                </div>
              </div>
            )}

            {/* PDF Compression Notice */}
            {isPDF && estimatedSize && (
              <div className="bg-cyan-500/8 rounded-xl p-4 border border-cyan-500/15">
                <h4 className="text-xs font-semibold text-cyan-300 mb-2 uppercase tracking-wider">
                  PDF Compression
                </h4>
                <p className="text-sm text-cyan-400/70 leading-relaxed">
                  PDF compression will reduce file size while preserving all
                  content and ensuring compatibility. The compressed PDF will
                  maintain text, images, and layout quality.
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Action Buttons */}
      {selectedFile && (
        <div className="p-4 border-t border-slate-800/80 space-y-3">
          <button
            onClick={handleResize}
            disabled={isProcessing}
            className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold text-sm transition-all duration-200 cursor-pointer ${
              isProcessing
                ? "bg-slate-800/60 text-slate-500 cursor-not-allowed border border-slate-700/30"
                : "btn-cta"
            }`}
          >
            {isProcessing ? (
              <>
                <div className="w-4 h-4 border-2 border-slate-600 border-t-emerald-400 rounded-full animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                {isPDF ? "Compress & Save" : "Resize & Save"}
              </>
            )}
          </button>

          <div className="flex gap-2">
            <button
              onClick={onNext}
              className="flex-1 px-4 py-2 text-sm text-slate-400 bg-slate-800/40 rounded-lg hover:bg-slate-700/50 hover:text-slate-200 transition-all duration-200 cursor-pointer border border-slate-700/30"
            >
              Skip
            </button>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 text-sm text-slate-400 bg-slate-800/40 rounded-lg hover:bg-slate-700/50 hover:text-slate-200 transition-all duration-200 cursor-pointer border border-slate-700/30"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
