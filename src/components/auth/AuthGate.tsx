"use client";

import React, { useState } from "react";
import { Zap, ShieldCheck, Lock, Mail, User, Building, MapPin, ChevronRight, Key, AlertCircle } from "lucide-react";
import { useUser } from "@/context/UserContext";

export function AuthGate() {
  const { loginUser, registerUser } = useUser();
  const [mode, setMode] = useState<"register" | "login">("register");

  // Login form state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Register form state
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regRole, setRegRole] = useState("Chief Smart City Operations Officer");
  const [regDept, setRegDept] = useState("Municipal Infrastructure Command");
  const [regCity, setRegCity] = useState("Smart Metro Region");
  const [regPassword, setRegPassword] = useState("");

  const [errorMsg, setErrorMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail.trim()) {
      setErrorMsg("Please enter your registered email address.");
      return;
    }
    setErrorMsg("");
    setIsSubmitting(true);
    setTimeout(() => {
      loginUser(loginEmail.trim());
      setIsSubmitting(false);
    }, 400);
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!regName.trim() || !regEmail.trim()) {
      setErrorMsg("Please fill out all required registration fields.");
      return;
    }
    setErrorMsg("");
    setIsSubmitting(true);
    try {
      await registerUser({
        name: regName.trim(),
        email: regEmail.trim(),
        role: regRole,
        organization: regDept.trim(),
        city: regCity.trim(),
      });
    } catch (err: any) {
      setErrorMsg(err.message || "Registration failed.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg text-text-primary flex items-center justify-center p-4 relative overflow-hidden select-none">
      {/* Background Glows */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-md w-full bg-surface border border-border rounded-card p-8 shadow-2xl relative z-10 space-y-6 animate-in fade-in zoom-in-95">
        {/* Header Branding */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-btn bg-gradient-to-tr from-blue-700 to-blue-500 flex items-center justify-center text-white font-bold mx-auto shadow-md">
            <Zap className="w-6 h-6 fill-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-text-primary">
              NeuraGrid<span className="text-primary">.ai</span>
            </h1>
            <p className="text-xs text-text-secondary mt-1">
              Enterprise Smart City Operating System Portal
            </p>
          </div>
        </div>

        {/* Tab Switcher (Register Admin vs Sign In) */}
        <div className="flex border-b border-border text-xs font-semibold">
          <button
            type="button"
            onClick={() => {
              setMode("register");
              setErrorMsg("");
            }}
            className={`flex-1 py-2.5 text-center border-b-2 transition-colors ${
              mode === "register"
                ? "border-primary text-primary font-bold"
                : "border-transparent text-text-tertiary hover:text-text-secondary"
            }`}
          >
            Register Admin Account
          </button>
          <button
            type="button"
            onClick={() => {
              setMode("login");
              setErrorMsg("");
            }}
            className={`flex-1 py-2.5 text-center border-b-2 transition-colors ${
              mode === "login"
                ? "border-primary text-primary font-bold"
                : "border-transparent text-text-tertiary hover:text-text-secondary"
            }`}
          >
            Sign In
          </button>
        </div>

        {errorMsg && (
          <div className="bg-red-bg border border-red-critical/30 rounded-card p-3 text-xs font-semibold text-red-critical flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Form 1: Admin Registration */}
        {mode === "register" ? (
          <form onSubmit={handleRegisterSubmit} className="space-y-3 text-xs">
            <div>
              <label className="font-bold text-text-primary block mb-1">Full Name *</label>
              <div className="relative">
                <User className="w-4 h-4 text-text-tertiary absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  placeholder="Enter your full name"
                  required
                  className="w-full pl-9 pr-3 py-2 bg-bg border border-border rounded-btn text-xs font-medium text-text-primary focus:border-primary focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="font-bold text-text-primary block mb-1">Official Email Address *</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-text-tertiary absolute left-3 top-2.5" />
                <input
                  type="email"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  placeholder="Enter your official email address"
                  required
                  className="w-full pl-9 pr-3 py-2 bg-bg border border-border rounded-btn text-xs font-medium text-text-primary focus:border-primary focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="font-bold text-text-primary block mb-1">Administrative Role</label>
              <select
                value={regRole}
                onChange={(e) => setRegRole(e.target.value)}
                className="w-full px-3 py-2 bg-bg border border-border rounded-btn text-xs font-medium text-text-primary focus:border-primary focus:outline-none"
              >
                <option value="Chief Smart City Operations Officer">Chief Smart City Operations Officer</option>
                <option value="Smart Grid Dispatch Lead">Smart Grid Dispatch Lead</option>
                <option value="Water Infrastructure Director">Water Infrastructure Director</option>
                <option value="Safety & Emergency Response Chief">Safety & Emergency Response Chief</option>
                <option value="System Administrator">System Administrator</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-text-primary block mb-1">Department / Organization</label>
              <div className="relative">
                <Building className="w-4 h-4 text-text-tertiary absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={regDept}
                  onChange={(e) => setRegDept(e.target.value)}
                  placeholder="Enter department name"
                  required
                  className="w-full pl-9 pr-3 py-2 bg-bg border border-border rounded-btn text-xs font-medium text-text-primary focus:border-primary focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="font-bold text-text-primary block mb-1">Security PIN / Password</label>
              <div className="relative">
                <Key className="w-4 h-4 text-text-tertiary absolute left-3 top-2.5" />
                <input
                  type="password"
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2 bg-bg border border-border rounded-btn text-xs font-medium text-text-primary focus:border-primary focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2.5 bg-primary text-white text-xs font-bold rounded-btn hover:bg-primary-hover transition-colors flex items-center justify-center gap-1.5 shadow-sm mt-2"
            >
              {isSubmitting ? "Registering Account..." : "Register & Access Dashboard"}
              <ChevronRight className="w-4 h-4" />
            </button>
          </form>
        ) : (
          /* Form 2: Sign In (Login) */
          <form onSubmit={handleLoginSubmit} className="space-y-3 text-xs">
            <div>
              <label className="font-bold text-text-primary block mb-1">Official Email Address *</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-text-tertiary absolute left-3 top-2.5" />
                <input
                  type="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="Enter your registered email address"
                  required
                  className="w-full pl-9 pr-3 py-2 bg-bg border border-border rounded-btn text-xs font-medium text-text-primary focus:border-primary focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="font-bold text-text-primary block mb-1">Security PIN / Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-text-tertiary absolute left-3 top-2.5" />
                <input
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2 bg-bg border border-border rounded-btn text-xs font-medium text-text-primary focus:border-primary focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2.5 bg-primary text-white text-xs font-bold rounded-btn hover:bg-primary-hover transition-colors flex items-center justify-center gap-1.5 shadow-sm mt-2"
            >
              {isSubmitting ? "Authenticating..." : "Sign In to Operations Console"}
              <ChevronRight className="w-4 h-4" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
