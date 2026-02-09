/**
 * SSO Authentication Service
 * Handles both SSO token-based login and normal email/password login
 */

import { useAuthStore, AuthUser } from "@/store/auth-store";

// API Base URLs
const MVC_API_URL = "https://mvc.bluesuite.in";
const ONEPLACE_API_URL = "https://oneplace.io";
const ONEPLACE_AUTH_TOKEN =
  "10|SCZSuHhDyIx1Co0k3CGXAKDc3eXCPBoykSafI7028fe19429";

// ============= Types =============

interface MvcLoginResponse {
  status: boolean;
  data: {
    token: string;
    id: number;
    uid: string;
    name: string;
    email: string;
    user_type: number | null;
  };
  message: string;
}

interface GetLoggedUserResponse {
  status: boolean;
  data: {
    user: {
      id: number;
      name: string;
      email: string;
      email_verified_at: string | null;
      password: string; // This is the password hash
      created_at: string;
      updated_at: string;
      google_id: string | null;
    };
    products: Array<{
      prod_name: string;
      prod_frontend_url: string;
      prod_backend_url: string;
    }>;
  };
  message: string;
}

interface DirectLoginResponse {
  status: boolean;
  data: {
    token: string;
    id: number;
    first_name: string;
    last_name: string | null;
    name: string;
    email: string;
    user_type: number;
    is_battlelounge: number;
    is_ysn: number;
    is_dkp: number;
    is_rivalis: number;
  };
  message: string;
}

interface AuthOverrides {
  is_admin: boolean;
  is_battlelounge: boolean;
  is_ysn: boolean;
  is_dkp: boolean;
  is_rivalis: boolean;
  ysn_mode: "admin" | "org";
  bl_mode: "admin" | "org";
}

// ============= Hardcoded Overrides =============
// These two emails have special access - they see ALL pages
// The difference is in YSN and BL mode (admin vs org)

const HARDCODED_OVERRIDES: Record<string, AuthOverrides> = {
  // Admin user - sees everything with admin access to YSN and BL
  "admin@hubts.io": {
    is_admin: true, // Shows all pages including Connected, ADP, Chase, YT, Analytics
    is_battlelounge: true,
    is_ysn: true,
    is_dkp: true,
    is_rivalis: true,
    ysn_mode: "admin", // YSN admin pages
    bl_mode: "admin", // BL admin pages
  },
  // Marketing user - sees all pages but with org access to BL
  "marketing@destinationkp.com": {
    is_admin: true, // Shows all pages including Connected, ADP, Chase, YT, Analytics
    is_battlelounge: true,
    is_ysn: true,
    is_dkp: true,
    is_rivalis: true,
    ysn_mode: "admin", // YSN admin pages
    bl_mode: "org", // BL org pages (not admin)
  },
};

// ============= API Functions =============

/**
 * Step 1a: Normal login with email/password
 * Only used for email/password login, not SSO
 */
export async function mvcLogin(
  email: string,
  password: string,
): Promise<MvcLoginResponse> {
  const response = await fetch(`${MVC_API_URL}/api/login`, {
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

/**
 * Step 2: Get logged user details including password hash
 * Used by both SSO and normal login flows
 */
export async function getLoggedUser(
  token: string,
): Promise<GetLoggedUserResponse> {
  const response = await fetch(`${MVC_API_URL}/api/get-logged-user`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to get user details");
  }

  return response.json();
}

/**
 * Step 3: Direct login to oneplace.io
 * Final step for both SSO and normal login
 */
export async function directLogin(
  name: string,
  email: string,
  hashId: string,
): Promise<DirectLoginResponse> {
  const response = await fetch(`${ONEPLACE_API_URL}/api/direct-login`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${ONEPLACE_AUTH_TOKEN}`,
    },
    body: JSON.stringify({
      name,
      email,
      hash_id: hashId,
    }),
  });

  if (!response.ok) {
    throw new Error("Direct login failed");
  }

  return response.json();
}

// ============= Combined Login Flows =============

/**
 * Try to decode Base64 encoded SSO token, or return as-is if not Base64
 */
function decodeToken(tokenParam: string): string {
  // Check if the token looks like Base64 (no special chars like | that would be in raw token)
  // Raw tokens typically have format like: 295|ytXzjtxsmLttE6an0HUh6Oy7c1smHyzajgjhrPFP49dde597
  // Base64 tokens don't contain | character
  if (tokenParam.includes("|")) {
    // This is a raw token, use as-is
    return tokenParam;
  }

  try {
    // Try to decode as Base64
    const decoded = atob(tokenParam);
    // If decoded successfully and contains |, it's a valid decoded token
    if (decoded.includes("|")) {
      return decoded;
    }
    // If no |, might be an unusual format, return as-is
    return tokenParam;
  } catch {
    // Not valid Base64, use as-is
    return tokenParam;
  }
}

/**
 * SSO Login Flow (when token is in URL)
 * 1. Decode Base64 token (or use raw token)
 * 2. Get user details from MVC
 * 3. Direct login to oneplace.io
 */
export async function ssoLogin(tokenParam: string): Promise<AuthUser> {
  // Step 1: Decode the token (handles both Base64 and raw tokens)
  const token = decodeToken(tokenParam);
  console.log("[SSO] Using token:", token);

  // Step 2: Get user details
  const userResponse = await getLoggedUser(token);
  if (!userResponse.status) {
    throw new Error(userResponse.message || "Failed to get user details");
  }

  const { user } = userResponse.data;
  console.log("[SSO] Got user:", user.email);

  // Step 3: Direct login to oneplace.io
  const directLoginResponse = await directLogin(
    user.name,
    user.email,
    user.password,
  );

  if (!directLoginResponse.status) {
    throw new Error(directLoginResponse.message || "Direct login failed");
  }

  console.log("[SSO] Direct login successful");

  // Apply permissions and return auth user
  return applyPermissions(directLoginResponse, user.email);
}

/**
 * Normal Login Flow (email/password)
 * 1. Login to MVC to get token
 * 2. Get user details from MVC
 * 3. Direct login to oneplace.io
 */
export async function normalLogin(
  email: string,
  password: string,
): Promise<AuthUser> {
  // Step 1: Login to MVC
  const mvcResponse = await mvcLogin(email, password);
  if (!mvcResponse.status) {
    throw new Error(mvcResponse.message || "Login failed");
  }

  const { token } = mvcResponse.data;

  // Step 2: Get user details
  const userResponse = await getLoggedUser(token);
  if (!userResponse.status) {
    throw new Error(userResponse.message || "Failed to get user details");
  }

  const { user } = userResponse.data;

  // Step 3: Direct login to oneplace.io
  const directLoginResponse = await directLogin(
    user.name,
    user.email,
    user.password,
  );

  if (!directLoginResponse.status) {
    throw new Error(directLoginResponse.message || "Direct login failed");
  }

  // Apply permissions and return auth user
  return applyPermissions(directLoginResponse, user.email);
}

// ============= Permission Helpers =============

/**
 * Get hardcoded overrides for specific email addresses
 */
export function getHardcodedOverrides(email: string): AuthOverrides | null {
  return HARDCODED_OVERRIDES[email.toLowerCase()] || null;
}

/**
 * Apply permissions from API response, with hardcoded overrides
 */
export function applyPermissions(
  response: DirectLoginResponse,
  email: string,
): AuthUser {
  const { data } = response;
  const overrides = getHardcodedOverrides(email);

  // Determine role based on user_type
  // user_type === 1 means admin, anything else is organizer
  const role: "admin" | "organizer" =
    overrides?.is_admin || data.user_type === 1 ? "admin" : "organizer";

  const authUser: AuthUser = {
    token: data.token,
    id: data.id,
    name: data.name,
    email: data.email,
    role,
    user_type: data.user_type,
    is_battlelounge: overrides
      ? overrides.is_battlelounge
      : Boolean(data.is_battlelounge),
    is_ysn: overrides ? overrides.is_ysn : Boolean(data.is_ysn),
    is_dkp: overrides ? overrides.is_dkp : Boolean(data.is_dkp),
    is_rivalis: overrides ? overrides.is_rivalis : Boolean(data.is_rivalis),
    ysn_mode: overrides?.ysn_mode || (data.user_type === 1 ? "admin" : "org"),
    bl_mode: overrides?.bl_mode || (data.user_type === 1 ? "admin" : "org"),
  };

  return authUser;
}

/**
 * Save auth user to store
 */
export function saveAuthUser(user: AuthUser): void {
  useAuthStore.getState().setUser(user);
}
