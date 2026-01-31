"use client";

import {
  useEffect,
  useState,
  createContext,
  useContext,
  ReactNode,
} from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuthStore, AuthUser } from "@/store/auth-store";
import { Loader2 } from "lucide-react";

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Public routes that don't require authentication
const publicRoutes = ["/login"];

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [isInitialized, setIsInitialized] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { user, isAuthenticated, logout: storeLogout } = useAuthStore();

  useEffect(() => {
    // Wait for hydration to complete
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (!isInitialized) return;

    const isPublicRoute = publicRoutes.some(
      (route) => pathname === route || pathname.startsWith(route + "/"),
    );

    // If not authenticated and trying to access protected route
    if (!isAuthenticated && !isPublicRoute && pathname !== "/") {
      router.push(`/login?redirect=${encodeURIComponent(pathname)}`);
    }

    // If authenticated and trying to access login
    if (isAuthenticated && pathname === "/login") {
      router.push("/overall");
    }
  }, [isAuthenticated, pathname, router, isInitialized]);

  const logout = () => {
    storeLogout();
    // Clear the persisted storage cookie for middleware
    document.cookie =
      "auth-storage=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    router.push("/login");
  };

  // Show loading state while initializing
  if (!isInitialized) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 text-violet-500 animate-spin" />
          <p className="text-sm text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, isLoading: !isInitialized, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
