"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface GoogleUser {
  id: string;
  email: string;
  name: string;
  picture: string;
}

interface GoogleAuthState {
  isConnected: boolean;
  user: GoogleUser | null;
  isLoading: boolean;
  error: string | null;

  // Actions
  setConnected: (connected: boolean, user?: GoogleUser | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  disconnect: () => Promise<void>;
  checkConnection: () => void;
}

export const useGoogleAuthStore = create<GoogleAuthState>()(
  persist(
    (set) => ({
      isConnected: false,
      user: null,
      isLoading: false,
      error: null,

      setConnected: (connected, user = null) =>
        set({ isConnected: connected, user, error: null }),

      setLoading: (loading) => set({ isLoading: loading }),

      setError: (error) => set({ error }),

      disconnect: async () => {
        set({ isLoading: true });
        try {
          await fetch("/api/auth/google/disconnect", { method: "POST" });
          set({ isConnected: false, user: null, error: null });
        } catch (error) {
          console.error("Disconnect error:", error);
          set({ error: "Failed to disconnect" });
        } finally {
          set({ isLoading: false });
        }
      },

      checkConnection: () => {
        if (typeof window === "undefined") return;

        // Check for google_user cookie
        const cookies = document.cookie.split(";");
        const userCookie = cookies.find((c) =>
          c.trim().startsWith("google_user=")
        );

        if (userCookie) {
          try {
            const userJson = decodeURIComponent(userCookie.split("=")[1]);
            const user = JSON.parse(userJson);
            set({ isConnected: true, user });
          } catch {
            set({ isConnected: false, user: null });
          }
        } else {
          set({ isConnected: false, user: null });
        }
      },
    }),
    {
      name: "google-auth-storage",
      partialize: (state) => ({
        isConnected: state.isConnected,
        user: state.user,
      }),
    }
  )
);
