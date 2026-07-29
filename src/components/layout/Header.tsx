"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Zap, Search, Bell, Bot, ShieldCheck, User, Command, ChevronDown } from "lucide-react";
import { useUser } from "@/context/UserContext";
import { GlobalSearchModal } from "@/components/navigation/GlobalSearchModal";
import { NotificationsDrawer } from "@/components/navigation/NotificationsDrawer";

interface HeaderProps {
  onToggleAiPanel?: () => void;
}

export function Header({ onToggleAiPanel }: HeaderProps) {
  const { user, logout } = useUser();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const userName = user?.name || "Operator Admin";
  const userEmail = user?.email || "admin@neuragrid.ai";
  const userRole = user?.role || "Chief Operations Officer";
  const avatarUrl = user?.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120";

  // Keyboard shortcut Ctrl+K listener
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-30 bg-surface border-b border-border px-4 py-2.5 shadow-xs">
        <div className="flex items-center justify-between gap-4">
          {/* Brand Logo & Platform Title */}
          <div className="flex items-center gap-3 shrink-0">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-btn bg-gradient-to-tr from-blue-700 to-blue-500 flex items-center justify-center text-white font-bold shadow-sm group-hover:scale-105 transition-transform">
                <Zap className="w-5 h-5 fill-white" />
              </div>
              <div className="hidden sm:block">
                <span className="text-base font-bold tracking-tight text-text-primary block leading-none">
                  NeuraGrid<span className="text-primary">.ai</span>
                </span>
                <span className="text-[10px] font-semibold text-text-tertiary uppercase tracking-wider">Enterprise OS</span>
              </div>
            </Link>
          </div>

          {/* Global Search Bar (Microsoft Azure / Palantir Style) */}
          <div className="flex-1 max-w-xl mx-auto">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="w-full flex items-center justify-between px-3 py-1.5 bg-bg border border-border rounded-btn text-xs text-text-tertiary hover:border-primary/40 hover:text-text-secondary transition-colors shadow-xs"
            >
              <div className="flex items-center gap-2">
                <Search className="w-4 h-4 text-primary" />
                <span>Search assets, routes, alerts, users (Ctrl+K)...</span>
              </div>
              <span className="hidden sm:flex items-center gap-0.5 text-[10px] font-mono-data bg-surface border border-border px-1.5 py-0.5 rounded text-text-tertiary">
                <Command className="w-3 h-3" /> K
              </span>
            </button>
          </div>

          {/* Right Action Icons: AI Assistant, Notifications, User Profile */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Live System Badge */}
            <div className="hidden lg:flex items-center gap-2 px-2.5 py-1 bg-emerald-bg border border-emerald-good/20 rounded-chip">
              <span className="w-2 h-2 rounded-full bg-emerald-good animate-pulse"></span>
              <span className="text-[11px] font-semibold text-emerald-good flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> Node Active
              </span>
            </div>

            {/* AI Assistant Toggle Button */}
            {onToggleAiPanel && (
              <button
                onClick={onToggleAiPanel}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 border border-primary/20 text-primary rounded-btn text-xs font-semibold hover:bg-primary/20 transition-colors"
                title="Toggle AI Assistant Panel"
              >
                <Bot className="w-4 h-4" />
                <span className="hidden md:inline">AI Copilot</span>
              </button>
            )}

            {/* Notifications Button */}
            <button
              onClick={() => setIsNotificationsOpen(true)}
              className="relative p-2 rounded-btn bg-bg border border-border hover:bg-surface text-text-secondary hover:text-text-primary transition-colors"
              title="System Notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-critical text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                3
              </span>
            </button>

            {/* Operator User Profile Menu */}
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-2 pl-2 border-l border-border hover:opacity-90 transition-opacity"
              >
                <img src={avatarUrl} alt={userName} className="w-8 h-8 rounded-full border border-border object-cover" />
                <div className="hidden md:block text-left">
                  <span className="text-xs font-semibold text-text-primary block leading-tight">{userName}</span>
                  <span className="text-[10px] text-text-tertiary block leading-tight">{userRole}</span>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-text-tertiary hidden md:block" />
              </button>

              {/* Profile Dropdown */}
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-surface border border-border rounded-card shadow-lg p-2 z-40 space-y-1 animate-in fade-in">
                  <div className="p-2 border-b border-border mb-1">
                    <p className="text-xs font-bold text-text-primary">{userName}</p>
                    <p className="text-[11px] text-text-tertiary font-mono-data">{userEmail}</p>
                  </div>
                  <Link
                    href="/admin/register"
                    onClick={() => setIsUserMenuOpen(false)}
                    className="block px-3 py-1.5 text-xs text-primary font-bold hover:bg-bg rounded-btn"
                  >
                    + Register New Admin
                  </Link>
                  <Link
                    href="/admin/users"
                    onClick={() => setIsUserMenuOpen(false)}
                    className="block px-3 py-1.5 text-xs text-text-secondary hover:text-text-primary hover:bg-bg rounded-btn"
                  >
                    User Management
                  </Link>
                  <Link
                    href="/admin/settings"
                    onClick={() => setIsUserMenuOpen(false)}
                    className="block px-3 py-1.5 text-xs text-text-secondary hover:text-text-primary hover:bg-bg rounded-btn"
                  >
                    System Settings
                  </Link>
                  <div className="border-t border-border pt-1">
                    <button
                      onClick={() => {
                        setIsUserMenuOpen(false);
                        logout();
                      }}
                      className="w-full text-left px-3 py-1.5 text-xs text-red-critical font-bold cursor-pointer hover:bg-red-bg rounded-btn"
                    >
                      Sign Out / Lock Portal
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Global Modals & Drawers */}
      <GlobalSearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <NotificationsDrawer isOpen={isNotificationsOpen} onClose={() => setIsNotificationsOpen(false)} />
    </>
  );
}
