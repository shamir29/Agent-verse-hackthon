"use client";

import React from "react";

export function SkeletonCard({ height = "h-32", className = "" }: { height?: string; className?: string }) {
  return (
    <div
      className={`bg-surface border border-border rounded-card p-5 animate-pulse flex flex-col justify-between ${height} ${className}`}
    >
      <div className="flex items-center justify-between">
        <div className="h-4 bg-gray-200 rounded w-1/3"></div>
        <div className="h-6 w-6 bg-gray-200 rounded-full"></div>
      </div>
      <div className="space-y-2">
        <div className="h-8 bg-gray-200 rounded w-1/2"></div>
        <div className="h-3 bg-gray-100 rounded w-2/3"></div>
      </div>
    </div>
  );
}

export function SkeletonTable({ rows = 5 }: { rows?: number }) {
  return (
    <div className="bg-surface border border-border rounded-card p-5 space-y-4 animate-pulse">
      <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex items-center justify-between py-3 border-b border-border last:border-0">
          <div className="h-4 bg-gray-200 rounded w-1/3"></div>
          <div className="h-4 bg-gray-200 rounded w-1/6"></div>
          <div className="h-6 bg-gray-200 rounded-chip w-20"></div>
        </div>
      ))}
    </div>
  );
}
