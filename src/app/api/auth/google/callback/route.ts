import { NextRequest, NextResponse } from "next/server";
import { exchangeCodeForTokens, getGoogleUserInfo } from "@/lib/google-auth";
import { cookies } from "next/headers";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get("code");
  const error = searchParams.get("error");

  // Handle error from Google
  if (error) {
    console.error("Google OAuth error:", error);
    return NextResponse.redirect(
      new URL("/google-analytics?error=auth_failed", request.url)
    );
  }

  // Check for authorization code
  if (!code) {
    return NextResponse.redirect(
      new URL("/google-analytics?error=no_code", request.url)
    );
  }

  try {
    // Exchange code for tokens
    const tokens = await exchangeCodeForTokens(code);

    // Get user info
    const userInfo = await getGoogleUserInfo(tokens.access_token);

    // Store tokens in cookies (httpOnly for security)
    const cookieStore = await cookies();

    cookieStore.set("google_access_token", tokens.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: tokens.expires_in,
      path: "/",
    });

    if (tokens.refresh_token) {
      cookieStore.set("google_refresh_token", tokens.refresh_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 30 * 24 * 60 * 60, // 30 days
        path: "/",
      });
    }

    // Store user info (not httpOnly so frontend can access)
    cookieStore.set(
      "google_user",
      JSON.stringify({
        id: userInfo.id,
        email: userInfo.email,
        name: userInfo.name,
        picture: userInfo.picture,
      }),
      {
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: tokens.expires_in,
        path: "/",
      }
    );

    // Redirect back to the analytics page
    return NextResponse.redirect(
      new URL("/google-analytics?connected=true", request.url)
    );
  } catch (err) {
    console.error("Token exchange error:", err);
    return NextResponse.redirect(
      new URL("/google-analytics?error=token_exchange_failed", request.url)
    );
  }
}
