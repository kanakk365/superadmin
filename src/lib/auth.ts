import { useAuthStore, AuthUser } from "@/store/auth-store";

export interface LoginResponse {
  status: boolean;
  data: {
    token: string;
    id: number;
    name: string;
    email: string;
    user_type: number;
  };
  message: string;
}

export type User = AuthUser;

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

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

export function getUserRole(user_type: number): "admin" | "organizer" {
  if (user_type === 0) return "admin";
  if (user_type === 1) return "organizer";
  return "organizer";
}

export function saveAuthData(data: LoginResponse["data"]): void {
  const role = getUserRole(data.user_type);
  const user: AuthUser = {
    ...data,
    role,
    is_battlelounge: true,
    is_ysn: true,
    is_dkp: true,
    is_rivalis: true,
    ysn_mode: role === "admin" ? "admin" : "org",
    bl_mode: role === "admin" ? "admin" : "org",
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
