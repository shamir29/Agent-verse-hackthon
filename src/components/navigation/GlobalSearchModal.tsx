"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Search, X, Command, ChevronRight } from "lucide-react";

interface SearchResult {
  id: string;
  title: string;
  category: string;
  href: string;
  meta?: string;
}

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function GlobalSearchModal({ isOpen, onClose }: GlobalSearchModalProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const quickLinks: SearchResult[] = [
    { id: "q1", title: "Operations Center", category: "Core Workspace", href: "/" },
    { id: "q2", title: "Smart Grid Module", category: "Infrastructure", href: "/infrastructure/smart-grid" },
    { id: "q3", title: "Solar Optimization", category: "Infrastructure", href: "/infrastructure/solar" },
    { id: "q4", title: "Water Management", category: "Urban Services", href: "/urban-services/water" },
    { id: "q5", title: "Waste Management", category: "Urban Services", href: "/urban-services/waste" },
    { id: "q6", title: "EV Charging Grid", category: "Mobility", href: "/mobility/ev-charging" },
    { id: "q7", title: "Healthcare AI", category: "Healthcare", href: "/healthcare/healthcare-ai" },
    { id: "q8", title: "Master Alerts Log", category: "Incidents", href: "/incidents/alerts" },
    { id: "q9", title: "User Management", category: "Administration", href: "/admin/users" },
  ];

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery("");
      setResults([]);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        if (res.ok) {
          const data = await res.json();
          setResults(data);
        }
      } catch (err) {
        console.error("Search error:", err);
      } finally {
        setIsLoading(false);
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [query]);

  const handleSelect = (href: string) => {
    router.push(href);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-start justify-center pt-20 p-4 animate-in fade-in">
      <div
        className="bg-surface border border-border rounded-card max-w-2xl w-full shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center px-4 py-3 border-b border-border bg-bg/40">
          <Search className="w-5 h-5 text-primary mr-3 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search substations, reservoirs, alerts, solar arrays, users, or jump to route (Ctrl+K)..."
            className="flex-1 bg-transparent text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none"
          />
          {query && (
            <button onClick={() => setQuery("")} className="p-1 text-text-tertiary hover:text-text-primary mr-2">
              <X className="w-4 h-4" />
            </button>
          )}
          <span className="text-[10px] font-mono-data text-text-tertiary bg-surface border border-border px-1.5 py-0.5 rounded shadow-xs">
            ESC
          </span>
        </div>

        <div className="max-h-96 overflow-y-auto p-2 space-y-1">
          {isLoading ? (
            <div className="py-8 text-center text-xs text-text-tertiary font-medium">Searching smart city telemetry...</div>
          ) : query.trim() && results.length === 0 ? (
            <div className="py-8 text-center text-xs text-text-tertiary">No matching nodes, assets, or routes found for "{query}".</div>
          ) : (
            <>
              {!query.trim() && (
                <div className="px-3 py-1.5 text-[10px] font-bold text-text-tertiary uppercase tracking-wider">
                  Quick Navigation Shortcuts
                </div>
              )}
              {(query.trim() ? results : quickLinks).map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleSelect(item.href)}
                  className="w-full flex items-center justify-between p-2.5 rounded-btn hover:bg-bg transition-colors text-left group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-chip bg-primary/10 text-primary flex items-center justify-center">
                      <Command className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-text-primary group-hover:text-primary transition-colors block">
                        {item.title}
                      </span>
                      <span className="text-[11px] text-text-tertiary block font-medium">
                        {item.category} {item.meta ? `• ${item.meta}` : ""}
                      </span>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-text-tertiary group-hover:text-primary transition-colors opacity-0 group-hover:opacity-100" />
                </button>
              ))}
            </>
          )}
        </div>

        <div className="px-4 py-2 bg-bg border-t border-border flex items-center justify-between text-[11px] text-text-tertiary">
          <span>Use <strong>Ctrl+K</strong> anywhere to toggle global search</span>
          <span>NeuraGrid.ai Enterprise OS</span>
        </div>
      </div>
    </div>
  );
}
