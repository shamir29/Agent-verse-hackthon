"use client";

import React from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export function ErrorState({
  title = "Failed to load infrastructure data",
  message = "A connectivity or backend error occurred while reaching NeuraGrid services.",
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="bg-red-bg border border-red-critical/20 rounded-card p-8 text-center flex flex-col items-center justify-center my-4">
      <div className="w-12 h-12 rounded-full bg-red-critical/10 flex items-center justify-center text-red-critical mb-3">
        <AlertTriangle className="w-6 h-6" />
      </div>
      <h3 className="text-base font-semibold text-red-critical mb-1">{title}</h3>
      <p className="text-sm text-text-secondary max-w-md mb-4">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-2 px-4 py-2 bg-red-critical text-white text-sm font-medium rounded-btn hover:bg-red-critical/90 transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          Retry Request
        </button>
      )}
    </div>
  );
}
