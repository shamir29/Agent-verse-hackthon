"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { UserPlus, ShieldCheck, Mail, User, Building, MapPin, CheckCircle2, ChevronRight, Trash2 } from "lucide-react";
import { useUser } from "@/context/UserContext";

export default function AdminRegistrationPage() {
  const router = useRouter();
  const { registerUser } = useUser();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Chief Smart City Operations Officer");
  const [department, setDepartment] = useState("Municipal Infrastructure Command");
  const [city, setCity] = useState("Chennai Metro Region");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      setErrorMsg("Please fill out all required fields.");
      return;
    }

    setIsSubmitting(true);
    setErrorMsg("");

    try {
      // 1. Persist user in database via API
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          role,
          department: department.trim(),
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to register admin in database.");
      }

      // 2. Set active user profile in UserContext & localStorage
      registerUser({
        name: name.trim(),
        email: email.trim(),
        role,
        organization: department.trim(),
        city: city.trim(),
      });

      setSuccessMsg(`Admin Operator "${name.trim()}" registered successfully! Active workspace profile updated.`);
      
      setTimeout(() => {
        router.push("/admin/users");
      }, 1500);
    } catch (err: any) {
      setErrorMsg(err.message || "Registration failed.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePurgeDefaults = async () => {
    if (!confirm("Are you sure you want to remove all default seed users?")) return;
    try {
      const res = await fetch("/api/admin/users?clearAll=true", { method: "DELETE" });
      if (res.ok) {
        alert("Default users removed cleanly.");
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-text-primary flex items-center gap-2">
          <UserPlus className="w-6 h-6 text-primary" /> Admin Operator Registration
        </h1>
        <p className="text-sm text-text-secondary">
          Register a new administrative operator account. Registered details will immediately become the active profile across NeuraGrid.ai.
        </p>
      </div>

      {successMsg && (
        <div className="bg-emerald-bg border border-emerald-good/30 rounded-card p-4 text-xs font-semibold text-emerald-good flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {errorMsg && (
        <div className="bg-red-bg border border-red-critical/30 rounded-card p-4 text-xs font-semibold text-red-critical animate-in fade-in">
          {errorMsg}
        </div>
      )}

      <div className="bg-surface border border-border rounded-card p-6 shadow-sm space-y-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-text-primary block mb-1.5 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-primary" /> Full Name *
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Vikram Chandran"
                required
                className="w-full px-3.5 py-2.5 bg-bg border border-border rounded-btn text-xs font-medium text-text-primary focus:border-primary focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-text-primary block mb-1.5 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-primary" /> Official Email Address *
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. v.chandran@chennai.gov.in"
                required
                className="w-full px-3.5 py-2.5 bg-bg border border-border rounded-btn text-xs font-medium text-text-primary focus:border-primary focus:outline-none transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-text-primary block mb-1.5 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-primary" /> Administrative Role
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-bg border border-border rounded-btn text-xs font-medium text-text-primary focus:border-primary focus:outline-none transition-colors"
              >
                <option value="Chief Smart City Operations Officer">Chief Smart City Operations Officer</option>
                <option value="Smart Grid Dispatch Lead">Smart Grid Dispatch Lead</option>
                <option value="Water Infrastructure Director">Water Infrastructure Director</option>
                <option value="Safety & Emergency Response Chief">Safety & Emergency Response Chief</option>
                <option value="System Administrator">System Administrator</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-text-primary block mb-1.5 flex items-center gap-1.5">
                <Building className="w-3.5 h-3.5 text-primary" /> Department / Organization
              </label>
              <input
                type="text"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                placeholder="e.g. Greater Chennai Municipal Infrastructure"
                required
                className="w-full px-3.5 py-2.5 bg-bg border border-border rounded-btn text-xs font-medium text-text-primary focus:border-primary focus:outline-none transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-text-primary block mb-1.5 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-primary" /> Municipality / Region
            </label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="e.g. Chennai Metro Region"
              required
              className="w-full px-3.5 py-2.5 bg-bg border border-border rounded-btn text-xs font-medium text-text-primary focus:border-primary focus:outline-none transition-colors"
            />
          </div>

          <div className="pt-4 border-t border-border flex items-center justify-between">
            <button
              type="button"
              onClick={handlePurgeDefaults}
              className="px-3 py-2 bg-red-bg text-red-critical text-xs font-semibold rounded-btn hover:bg-red-critical hover:text-white transition-colors inline-flex items-center gap-1.5"
            >
              <Trash2 className="w-4 h-4" /> Purge Default Seed Users
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 bg-primary text-white text-xs font-bold rounded-btn hover:bg-primary-hover transition-colors inline-flex items-center gap-2 shadow-sm"
            >
              {isSubmitting ? "Registering..." : "Complete Admin Registration"}
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
