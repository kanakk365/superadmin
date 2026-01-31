// Authentication utilities and API calls
import { useAuthStore, AuthUser } from "@/store/auth-store";

export interface LoginResponse {
  status: boolean;
  data: {
    token: string;
    id: number;
    name: string;
    email: string;
  };
  message: string;
}

export type User = AuthUser;

// API base URL - update this with your actual API URL
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://api.example.com";

export async function loginUser(
  email: string,
  password: string,
): Promise<LoginResponse> {
  const response = await fetch(`${API_BASE_URL}/api/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error("Login failed");
  }

  return response.json();
}

export function getUserRole(id: number): "admin" | "organizer" {
  if (id === 4) return "admin";
  if (id === 2) return "organizer";
  return "organizer"; // Default to organizer for other IDs
}

export function saveAuthData(data: LoginResponse["data"]): void {
  const role = getUserRole(data.id);
  const user: AuthUser = {
    ...data,
    role,
  };
  useAuthStore.getState().setUser(user);
}

export function getAuthToken(): string | null {
  return useAuthStore.getState().user?.token || null;
}

export function getUser(): User | null {
  return useAuthStore.getState().user;
}

export function logout(): void {
  useAuthStore.getState().logout();
}

export function isAuthenticated(): boolean {
  return useAuthStore.getState().isAuthenticated;
}
