"use client";

import { ArrowUpDown, Settings } from "lucide-react";

export default function FilterPanel({
  sizeFilter,
  setSizeFilter,
  sortBy,
  setSortBy,
  sortOrder,
  setSortOrder,
  resizeSettings,
  setResizeSettings,
}) {
  const sizePresets = [
    { label: "All Files", min: 0, max: Infinity },
    { label: "Small (< 1MB)", min: 0, max: 1024 * 1024 },
    { label: "Medium (1-10MB)", min: 1024 * 1024, max: 10 * 1024 * 1024 },
    { label: "Large (> 10MB)", min: 10 * 1024 * 1024, max: Infinity },
  ];

  const qualityPresets = [
    { label: "High Quality (90%)", value: 90 },
    { label: "Good Quality (80%)", value: 80 },
    { label: "Medium Quality (70%)", value: 70 },
    { label: "Low Quality (60%)", value: 60 },
  ];

  const dimensionPresets = [
    { label: "4K (3840×2160)", width: 3840, height: 2160 },
    { label: "Full HD (1920×1080)", width: 1920, height: 1080 },
    { label: "HD (1280×720)", width: 1280, height: 720 },
    { label: "Mobile (800×600)", width: 800, height: 600 },
    { label: "Custom", width: 0, height: 0 },
  ];

  return (
    <div className="bg-slate-900/80 backdrop-blur-sm border-b border-slate-800/80 p-5">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* File Size Filters */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <ArrowUpDown className="w-4 h-4 text-emerald-400" />
            <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider font-heading">
              File Size Filter
            </h3>
          </div>

          <div className="space-y-2">
            {sizePresets.map((preset, index) => (
              <label key={index} className="flex items-center gap-3 cursor-pointer group">
                <div className="relative flex items-center justify-center">
                  <input
                    type="radio"
                    name="sizeFilter"
                    checked={
                      sizeFilter.min === preset.min &&
                      sizeFilter.max === preset.max
                    }
                    onChange={() =>
                      setSizeFilter({ min: preset.min, max: preset.max })
                    }
                    className="w-4 h-4 appearance-none border-2 border-slate-600 rounded-full bg-transparent checked:border-emerald-400 checked:bg-emerald-400 transition-all duration-200 cursor-pointer"
                  />
                </div>
                <span className="text-sm text-slate-400 group-hover:text-slate-200 transition-colors duration-200">
                  {preset.label}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Sort Options */}
        <div className="space-y-3">
          <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider font-heading">Sort By</h3>

          <div className="space-y-2">
            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="radio"
                name="sortBy"
                value="name"
                checked={sortBy === "name"}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-4 h-4 appearance-none border-2 border-slate-600 rounded-full bg-transparent checked:border-emerald-400 checked:bg-emerald-400 transition-all duration-200 cursor-pointer"
              />
              <span className="text-sm text-slate-400 group-hover:text-slate-200 transition-colors duration-200">Name</span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="radio"
                name="sortBy"
                value="size"
                checked={sortBy === "size"}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-4 h-4 appearance-none border-2 border-slate-600 rounded-full bg-transparent checked:border-emerald-400 checked:bg-emerald-400 transition-all duration-200 cursor-pointer"
              />
              <span className="text-sm text-slate-400 group-hover:text-slate-200 transition-colors duration-200">File Size</span>
            </label>
          </div>

          <div className="pt-2">
            <label className="flex items-center gap-3 cursor-pointer group">
              <div className="relative">
                <input
                  type="checkbox"
                  checked={sortOrder === "desc"}
                  onChange={(e) =>
                    setSortOrder(e.target.checked ? "desc" : "asc")
                  }
                  className="w-4 h-4 appearance-none border-2 border-slate-600 rounded bg-transparent checked:border-emerald-400 checked:bg-emerald-400 transition-all duration-200 cursor-pointer"
                />
              </div>
              <span className="text-sm text-slate-400 group-hover:text-slate-200 transition-colors duration-200">
                Descending order
              </span>
            </label>
          </div>
        </div>

        {/* Resize Settings */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 mb-2">
            <Settings className="w-4 h-4 text-emerald-400" />
            <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider font-heading">
              Resize Settings
            </h3>
          </div>

          {/* Magic Auto-Optimize Toggle */}
          <div className="flex items-center justify-between p-3 rounded-lg border border-emerald-500/30 bg-emerald-500/5 mb-2">
            <div className="flex flex-col">
              <span className="text-sm font-medium text-emerald-400">✨ Magic Auto-Optimize</span>
              <span className="text-xs text-slate-400">Perfectly balances size and visual quality</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={resizeSettings.autoOptimize}
                onChange={(e) =>
                  setResizeSettings({ ...resizeSettings, autoOptimize: e.target.checked })
                }
              />
              <div className="w-9 h-5 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-500"></div>
            </label>
          </div>

          {/* Quality Setting */}
          <div className={`space-y-1.5 transition-opacity duration-200 ${resizeSettings.autoOptimize ? 'opacity-40 pointer-events-none' : ''}`}>
            <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">Quality</label>
            <select
              value={resizeSettings.quality}
              onChange={(e) =>
                setResizeSettings({
                  ...resizeSettings,
                  quality: parseInt(e.target.value),
                })
              }
              className="w-full text-sm bg-slate-800/60 border border-slate-700/50 rounded-lg px-3 py-2 text-slate-300 focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500/40 transition-all duration-200 cursor-pointer"
            >
              {qualityPresets.map((preset, index) => (
                <option key={index} value={preset.value} className="bg-slate-800 text-slate-300">
                  {preset.label}
                </option>
              ))}
            </select>
          </div>

          {/* Dimensions Setting */}
          <div className={`space-y-1.5 transition-opacity duration-200 ${resizeSettings.autoOptimize ? 'opacity-40 pointer-events-none' : ''}`}>
            <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">
              Max Dimensions
            </label>
            <select
              onChange={(e) => {
                const preset = dimensionPresets[parseInt(e.target.value)];
                setResizeSettings({
                  ...resizeSettings,
                  maxWidth: preset.width || resizeSettings.maxWidth,
                  maxHeight: preset.height || resizeSettings.maxHeight,
                });
              }}
              className="w-full text-sm bg-slate-800/60 border border-slate-700/50 rounded-lg px-3 py-2 text-slate-300 focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500/40 transition-all duration-200 cursor-pointer"
            >
              {dimensionPresets.map((preset, index) => (
                <option key={index} value={index} className="bg-slate-800 text-slate-300">
                  {preset.label}
                </option>
              ))}
            </select>
          </div>

          {/* Custom Dimensions */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-xs text-slate-600 uppercase tracking-wider">Width</label>
              <input
                type="number"
                value={resizeSettings.maxWidth}
                onChange={(e) =>
                  setResizeSettings({
                    ...resizeSettings,
                    maxWidth: parseInt(e.target.value) || 1920,
                  })
                }
                className="w-full text-sm bg-slate-800/60 border border-slate-700/50 rounded-lg px-3 py-2 text-slate-300 font-heading focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500/40 transition-all duration-200"
                min="100"
                max="10000"
              />
            </div>
            <div>
              <label className="text-xs text-slate-600 uppercase tracking-wider">Height</label>
              <input
                type="number"
                value={resizeSettings.maxHeight}
                onChange={(e) =>
                  setResizeSettings({
                    ...resizeSettings,
                    maxHeight: parseInt(e.target.value) || 1080,
                  })
                }
                className="w-full text-sm bg-slate-800/60 border border-slate-700/50 rounded-lg px-3 py-2 text-slate-300 font-heading focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500/40 transition-all duration-200"
                min="100"
                max="10000"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
