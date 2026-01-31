"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth-store";
import { Loader2, ShieldAlert } from "lucide-react";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: "admin" | "organizer";
}

export function ProtectedRoute({
  children,
  requiredRole,
}: ProtectedRouteProps) {
  const [isChecking, setIsChecking] = useState(true);
  const router = useRouter();
  const { user, isAuthenticated } = useAuthStore();

  useEffect(() => {
    // Wait for hydration
    const timer = setTimeout(() => {
      if (!isAuthenticated) {
        router.push("/login");
        return;
      }

      // If a specific role is required, check for it
      if (requiredRole && user?.role !== requiredRole) {
        // User doesn't have the required role
        setIsChecking(false);
        return;
      }

      setIsChecking(false);
    }, 100);

    return () => clearTimeout(timer);
  }, [isAuthenticated, user, requiredRole, router]);

  if (isChecking) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 text-violet-500 animate-spin" />
          <p className="text-sm text-muted-foreground">Verifying access...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  // If role check failed
  if (requiredRole && user?.role !== requiredRole) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4 text-center max-w-md p-8">
          <div className="p-4 bg-red-500/10 rounded-2xl">
            <ShieldAlert className="w-12 h-12 text-red-500" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Access Denied</h1>
          <p className="text-muted-foreground">
            You don&apos;t have permission to access this page. This area
            requires{" "}
            <span className="font-semibold text-foreground capitalize">
              {requiredRole}
            </span>{" "}
            privileges.
          </p>
          <button
            onClick={() => router.push("/overall")}
            className="mt-4 px-6 py-2 bg-violet-600 hover:bg-violet-500 text-white rounded-lg transition-colors"
          >
            Go Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
