import React from 'react';

export default function Loading() {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-b from-[#0f172a] to-[#1e293b]">
      <div className="relative">
        <div className="w-24 h-24 border-4 border-blue-400 border-dashed rounded-full animate-spin-slow"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-blue-300 font-semibold">Loading...</span>
        </div>
      </div>

      {/* 自定义动画 */}
      <style>
        {`
          @keyframes spin-slow {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          .animate-spin-slow {
            animation: spin-slow 1.8s linear infinite;
          }
        `}
      </style>
    </div>
  );
}
