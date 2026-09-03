"use client";

import { useState, useEffect } from "react";
import { CheckCircle, AlertCircle, Info, X } from "lucide-react";

export default function ProcessingStatus({
  isVisible,
  type = "info",
  message,
  onClose,
  autoHide = true,
  duration = 3000,
}) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setShow(true);
      if (autoHide) {
        const timer = setTimeout(() => {
          setShow(false);
          if (onClose) {
            setTimeout(() => onClose(), 300);
          }
        }, duration);
        return () => clearTimeout(timer);
      }
    }
  }, [isVisible, autoHide, duration, onClose]);

  if (!isVisible) return null;

  const getIcon = () => {
    switch (type) {
      case "success":
        return <CheckCircle className="w-5 h-5 text-emerald-400" />;
      case "warning":
        return <AlertCircle className="w-5 h-5 text-amber-400" />;
      case "error":
        return <AlertCircle className="w-5 h-5 text-rose-400" />;
      default:
        return <Info className="w-5 h-5 text-cyan-400" />;
    }
  };

  const getBorderColor = () => {
    switch (type) {
      case "success":
        return "border-emerald-500/30 shadow-[0_0_20px_rgba(34,197,94,0.1)]";
      case "warning":
        return "border-amber-500/30 shadow-[0_0_20px_rgba(245,158,11,0.1)]";
      case "error":
        return "border-rose-500/30 shadow-[0_0_20px_rgba(244,63,94,0.1)]";
      default:
        return "border-cyan-500/30 shadow-[0_0_20px_rgba(6,182,212,0.1)]";
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      <div
        className={`
          glass-card ${getBorderColor()}
          p-4 max-w-sm
          transition-all duration-300 ease-out
          ${show ? "animate-slide-in-right" : "translate-x-full opacity-0"}
        `}
      >
        <div className="flex items-start gap-3">
          {getIcon()}
          <div className="flex-1">
            <p className="text-sm font-medium text-slate-200">{message}</p>
          </div>
          {!autoHide && (
            <button
              onClick={() => {
                setShow(false);
                if (onClose) {
                  setTimeout(() => onClose(), 300);
                }
              }}
              className="text-slate-500 hover:text-slate-300 transition-colors duration-200 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
