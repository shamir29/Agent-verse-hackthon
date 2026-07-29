"use client";

import React from "react";
import { FolderSearch } from "lucide-react";

interface EmptyStateProps {
  title?: string;
  description?: string;
  onResetFilters?: () => void;
}

export function EmptyState({
  title = "No results found",
  description = "No items match your active search terms or status filters.",
  onResetFilters,
}: EmptyStateProps) {
  return (
    <div className="bg-surface border border-border rounded-card p-10 text-center flex flex-col items-center justify-center my-4">
      <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-text-tertiary mb-3">
        <FolderSearch className="w-6 h-6" />
      </div>
      <h3 className="text-base font-semibold text-text-primary mb-1">{title}</h3>
      <p className="text-sm text-text-secondary max-w-md mb-4">{description}</p>
      {onResetFilters && (
        <button
          onClick={onResetFilters}
          className="px-4 py-2 bg-primary text-white text-sm font-medium rounded-btn hover:bg-primary-hover transition-colors"
        >
          Reset Filters
        </button>
      )}
    </div>
  );
}
