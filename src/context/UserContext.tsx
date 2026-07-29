"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: string;
  organization: string;
  city: string;
  avatarUrl: string;
}

interface UserContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  loginUser: (email: string, name?: string, role?: string, department?: string) => void;
  registerUser: (profileData: Partial<UserProfile>) => Promise<void>;
  logout: () => void;
}



const UserContext = createContext<UserContextType>({
  user: null,
  isAuthenticated: false,
  loginUser: () => {},
  registerUser: async () => {},
  logout: () => {},
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUserState] = useState<UserProfile | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isInitializing, setIsInitializing] = useState<boolean>(true);

  useEffect(() => {
    try {
      const isAuth = localStorage.getItem("neuragrid_authenticated");
      const savedUser = localStorage.getItem("neuragrid_active_user");

      if (isAuth === "true" && savedUser) {
        setUserState(JSON.parse(savedUser));
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        setUserState(null);
      }
    } catch (e) {
      console.error("Failed to load auth session from localStorage", e);
    } finally {
      setIsInitializing(false);
    }
  }, []);

  const loginUser = (email: string, name?: string, role?: string, department?: string) => {
    const profile: UserProfile = {
      id: `usr_${Date.now()}`,
      name: name || email.split("@")[0].replace(".", " "),
      email: email,
      role: role || "Chief Smart City Operations Officer",
      organization: department || "Municipal Infrastructure Command",
      city: "Chennai Metro Region",
      avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120",
    };

    setUserState(profile);
    setIsAuthenticated(true);
    try {
      localStorage.setItem("neuragrid_authenticated", "true");
      localStorage.setItem("neuragrid_active_user", JSON.stringify(profile));
    } catch (e) {
      console.error(e);
    }
  };

  const registerUser = async (profileData: Partial<UserProfile>) => {
    const newProfile: UserProfile = {
      id: `usr_${Date.now()}`,
      name: profileData.name || "Registered Admin",
      email: profileData.email || "admin@neuragrid.ai",
      role: profileData.role || "Chief Operations Officer",
      organization: profileData.organization || "Greater Municipal Infrastructure",
      city: profileData.city || "Chennai Metro Region",
      avatarUrl:
        profileData.avatarUrl ||
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120",
    };

    // Save user record to SQLite database via API
    try {
      await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newProfile.name,
          email: newProfile.email,
          role: newProfile.role,
          department: newProfile.organization,
        }),
      });
    } catch (e) {
      console.error("Database user save error:", e);
    }

    setUserState(newProfile);
    setIsAuthenticated(true);
    try {
      localStorage.setItem("neuragrid_authenticated", "true");
      localStorage.setItem("neuragrid_active_user", JSON.stringify(newProfile));
    } catch (e) {
      console.error(e);
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserState(null);
    try {
      localStorage.removeItem("neuragrid_authenticated");
      localStorage.removeItem("neuragrid_active_user");
    } catch (e) {
      console.error(e);
    }
  };

  if (isInitializing) {
    return (
      <div className="min-h-screen bg-bg text-text-primary flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-xs font-semibold text-text-secondary">Verifying Security Session...</p>
        </div>
      </div>
    );
  }

  return (
    <UserContext.Provider value={{ user, isAuthenticated, loginUser, registerUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
