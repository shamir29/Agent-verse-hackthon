"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Users, UserPlus, ShieldCheck, Mail, CheckCircle2, X, Trash2, UserCheck } from "lucide-react";
import { SkeletonTable } from "@/components/ui/SkeletonCard";
import { useUser } from "@/context/UserContext";

export default function UserManagementPage() {
  const queryClient = useQueryClient();
  const { user: activeUser, loginUser } = useUser();
  const [isAddOpen, setIsAddOpen] = useState(false);

  const [nameInput, setNameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [roleInput, setRoleInput] = useState("Grid Dispatcher");
  const [deptInput, setDeptInput] = useState("Smart Grid Maintenance");

  const { data: users = [], isLoading } = useQuery<any[]>({
    queryKey: ["adminUsers"],
    queryFn: async () => (await fetch("/api/admin/users")).json(),
  });

  const addUserMutation = useMutation({
    mutationFn: async (userObj: any) => {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userObj),
      });
      if (!res.ok) throw new Error("Failed to add user");
      return res.json();
    },
    onSuccess: (newUser) => {
      queryClient.invalidateQueries({ queryKey: ["adminUsers"] });
      // Set as active user immediately
      loginUser(newUser.email, newUser.name, newUser.role, newUser.department);
      setIsAddOpen(false);
      setNameInput("");
      setEmailInput("");
    },
  });

  const deleteUserMutation = useMutation({
    mutationFn: async (id?: string) => {
      const url = id ? `/api/admin/users?id=${id}` : `/api/admin/users?clearAll=true`;
      const res = await fetch(url, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminUsers"] });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameInput.trim() || !emailInput.trim()) return;
    addUserMutation.mutate({
      name: nameInput.trim(),
      email: emailInput.trim(),
      role: roleInput,
      department: deptInput,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-text-primary flex items-center gap-2">
            <Users className="w-6 h-6 text-primary" /> User Management & RBAC Administration
          </h1>
          <p className="text-sm text-text-secondary">
            Manage municipal operator accounts, department assignments, and active workspace profile.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => {
              if (confirm("Clear all pre-seeded default users?")) {
                deleteUserMutation.mutate(undefined);
              }
            }}
            className="px-3 py-2 bg-red-bg text-red-critical text-xs font-semibold rounded-btn hover:bg-red-critical hover:text-white transition-colors inline-flex items-center gap-1.5"
          >
            <Trash2 className="w-4 h-4" /> Purge Default Users
          </button>

          <Link
            href="/admin/register"
            className="px-4 py-2 bg-primary text-white text-xs font-bold rounded-btn hover:bg-primary-hover transition-colors inline-flex items-center gap-1.5 shadow-sm"
          >
            <UserPlus className="w-4 h-4" /> Register New Admin
          </Link>
        </div>
      </div>

      <div className="bg-surface border border-border rounded-card p-5 space-y-4 shadow-sm">
        {isLoading ? (
          <SkeletonTable rows={5} />
        ) : users.length === 0 ? (
          <div className="text-center py-10 space-y-3">
            <Users className="w-10 h-10 text-text-tertiary mx-auto" />
            <h3 className="text-sm font-bold text-text-primary">No Registered Users Found</h3>
            <p className="text-xs text-text-secondary">All default seed users have been purged. Register your admin account to begin.</p>
            <Link
              href="/admin/register"
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white text-xs font-bold rounded-btn shadow-sm"
            >
              <UserPlus className="w-4 h-4" /> Go to Admin Registration
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-border text-[11px] font-semibold uppercase text-text-tertiary bg-bg/50">
                  <th className="py-3 px-4">Operator Name</th>
                  <th className="py-3 px-4">Email</th>
                  <th className="py-3 px-4">Role</th>
                  <th className="py-3 px-4">Department</th>
                  <th className="py-3 px-4">Active Profile</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {users.map((u) => {
                  const isActive = activeUser ? (activeUser.name === u.name || activeUser.email === u.email) : false;
                  return (
                    <tr key={u.id} className="hover:bg-bg/60">
                      <td className="py-3 px-4 font-bold text-text-primary">{u.name}</td>
                      <td className="py-3 px-4 text-text-secondary font-mono-data">{u.email}</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded-chip text-[11px] font-semibold bg-blue-50 text-blue-600 border border-blue-200">
                          {u.role}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-text-secondary">{u.department}</td>
                      <td className="py-3 px-4">
                        {isActive ? (
                          <span className="inline-flex items-center gap-1 text-emerald-good font-bold bg-emerald-bg px-2 py-0.5 rounded-chip text-[11px]">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Active Session
                          </span>
                        ) : (
                          <button
                            onClick={() =>
                              loginUser(u.email, u.name, u.role, u.department)
                            }
                            className="text-[11px] font-semibold text-primary hover:underline"
                          >
                            Switch Profile
                          </button>
                        )}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => deleteUserMutation.mutate(u.id)}
                          className="p-1 text-text-tertiary hover:text-red-critical"
                          title="Delete User"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {isAddOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-surface border border-border rounded-card max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-start justify-between border-b border-border pb-3">
              <h3 className="text-sm font-bold text-text-primary">Add Operator Account</h3>
              <button onClick={() => setIsAddOpen(false)}><X className="w-4 h-4 text-text-tertiary" /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-text-primary block mb-1">Full Name</label>
                <input
                  type="text"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  placeholder="e.g. Vikram Chandran"
                  required
                  className="w-full px-3 py-2 text-xs bg-bg border border-border rounded-btn"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-text-primary block mb-1">Email Address</label>
                <input
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="e.g. v.chandran@chennai.gov.in"
                  required
                  className="w-full px-3 py-2 text-xs bg-bg border border-border rounded-btn"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-text-primary block mb-1">Role</label>
                <select
                  value={roleInput}
                  onChange={(e) => setRoleInput(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-bg border border-border rounded-btn"
                >
                  <option value="Administrator">Administrator</option>
                  <option value="Grid Dispatcher">Grid Dispatcher</option>
                  <option value="Water Ops Lead">Water Ops Lead</option>
                  <option value="Safety Analyst">Safety Analyst</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-text-primary block mb-1">Department</label>
                <input
                  type="text"
                  value={deptInput}
                  onChange={(e) => setDeptInput(e.target.value)}
                  required
                  className="w-full px-3 py-2 text-xs bg-bg border border-border rounded-btn"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setIsAddOpen(false)} className="px-3 py-1.5 text-xs bg-bg rounded-btn">Cancel</button>
                <button type="submit" disabled={addUserMutation.isPending} className="px-4 py-1.5 text-xs bg-primary text-white font-semibold rounded-btn">
                  Create User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
