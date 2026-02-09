import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface AuthUser {
  token: string;
  id: number;
  name: string;
  email: string;
  role: "admin" | "organizer";
  user_type: number;
  is_battlelounge: boolean;
  is_ysn: boolean;
  is_dkp: boolean;
  is_rivalis: boolean;
  ysn_mode: "admin" | "org";
  bl_mode: "admin" | "org";
}

interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  setUser: (user: AuthUser) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  logout: () => void;
}

// Custom storage that syncs with both localStorage and cookies
const customStorage = {
  getItem: (name: string) => {
    if (typeof window === "undefined") return null;
    const value = localStorage.getItem(name);
    return value;
  },
  setItem: (name: string, value: string) => {
    if (typeof window === "undefined") return;
    localStorage.setItem(name, value);
    // Also set a cookie for middleware access
    document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=604800; SameSite=Lax`;
  },
  removeItem: (name: string) => {
    if (typeof window === "undefined") return;
    localStorage.removeItem(name);
    // Also remove the cookie
    document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
  },
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      setUser: (user) => {
        console.log(
          "[AuthStore] Setting user:",
          user.email,
          "bl_mode:",
          user.bl_mode,
        );
        set({ user, isAuthenticated: true, error: null });
      },
      setLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error, isLoading: false }),
      logout: () => {
        // Clear cookie on logout
        if (typeof window !== "undefined") {
          document.cookie =
            "auth-storage=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
        }
        set({ user: null, isAuthenticated: false, error: null });
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => customStorage),
      version: 2, // Increment version to force re-login with new fields
      migrate: (persistedState, version) => {
        // If old version, clear and require re-login
        if (version < 2) {
          console.log(
            "[AuthStore] Migrating from version",
            version,
            "to 2 - clearing old data",
          );
          return {
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,
          };
        }
        return persistedState as AuthState;
      },
    },
  ),
);
