// Authentication utilities and API calls

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

export interface User {
  token: string;
  id: number;
  name: string;
  email: string;
  role: "admin" | "organizer";
}

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
  if (typeof window !== "undefined") {
    localStorage.setItem("auth_token", data.token);
    localStorage.setItem(
      "user",
      JSON.stringify({
        ...data,
        role: getUserRole(data.id),
      }),
    );
  }
}

export function getAuthToken(): string | null {
  if (typeof window !== "undefined") {
    return localStorage.getItem("auth_token");
  }
  return null;
}

export function getUser(): User | null {
  if (typeof window !== "undefined") {
    const user = localStorage.getItem("user");
    if (user) {
      return JSON.parse(user);
    }
  }
  return null;
}

export function logout(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user");
  }
}

export function isAuthenticated(): boolean {
  return !!getAuthToken();
}
