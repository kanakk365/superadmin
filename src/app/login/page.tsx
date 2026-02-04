"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  Loader2,
  Gamepad2,
  Trophy,
  Sparkles,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { useAuthStore } from "@/store/auth-store";
import { loginUser, getUserRole } from "@/lib/auth";
import { motion, AnimatePresence } from "motion/react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const { setUser, isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/overall");
    }
  }, [isAuthenticated, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const response = await loginUser(email, password);

      if (response.status) {
        const role = getUserRole(response.data.user_type);

        setUser({
          ...response.data,
          role,
        });

        setTimeout(() => {
          router.push("/overall");
        }, 800);
      } else {
        setError(response.message || "Invalid credentials.");
      }
    } catch (err) {
      setError("Unable to connect to server.");
      console.error("Login error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-black relative overflow-hidden font-sans selection:bg-violet-500/30">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute -top-[20%] -left-[10%] w-[70vw] h-[70vw] rounded-full bg-violet-600/10 blur-[120px] animate-pulse"
          style={{ animationDuration: "8s" }}
        />
        <div
          className="absolute -bottom-[20%] -right-[10%] w-[60vw] h-[60vw] rounded-full bg-blue-600/10 blur-[100px] animate-pulse"
          style={{ animationDuration: "10s", animationDelay: "1s" }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vw] rounded-full bg-fuchsia-600/5 blur-[80px]" />
      </div>

      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-[1200px] grid lg:grid-cols-2 gap-8 items-center p-4 lg:p-12">
        {/* Left Side */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="hidden lg:flex flex-col gap-8 pr-12"
        >
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-300 text-xs font-medium w-fit"
            >
              <Sparkles className="w-3 h-3" />
              <span>Admin Dashboard v2.0</span>
            </motion.div>
            <h1 className="text-5xl lg:text-7xl font-bold bg-gradient-to-br from-white via-white to-white/50 bg-clip-text text-transparent leading-tight">
              Control <br />
              Everything.
            </h1>
            <p className="text-lg text-muted-foreground/80 max-w-md leading-relaxed">
              Seamlessly manage Battle Lounge & YSN events from one unified
              command center.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-6 rounded-2xl border border-white/5 bg-white/5 backdrop-blur-sm group hover:bg-white/10 transition-colors">
              <Gamepad2 className="w-8 h-8 text-emerald-400 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-lg font-semibold text-white mb-2">
                Battle Lounge
              </h3>
              <p className="text-sm text-white/40">Tournament ecosystem</p>
            </div>
            <div className="p-6 rounded-2xl border border-white/5 bg-white/5 backdrop-blur-sm group hover:bg-white/10 transition-colors">
              <Trophy className="w-8 h-8 text-pink-400 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-lg font-semibold text-white mb-2">YSN</h3>
              <p className="text-sm text-white/40">Youth Sports Network</p>
            </div>
          </div>
        </motion.div>

        {/* Right Side - Login Form */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="w-full max-w-md mx-auto"
        >
          <div className="group relative rounded-[32px] p-[1px] bg-gradient-to-b from-white/20 to-white/5 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-violet-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative rounded-[31px] bg-black/80 backdrop-blur-xl p-8 shadow-2xl">
              <div className="flex flex-col gap-6">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">
                    Welcome Back
                  </h2>
                  <p className="text-muted-foreground">
                    Sign in to access your dashboard
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <AnimatePresence>
                    {error && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-center gap-2 overflow-hidden"
                      >
                        <ShieldCheck className="w-4 h-4 shrink-0" />
                        {error}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-xs font-medium text-muted-foreground ml-1 uppercase tracking-wider">
                        Email Address
                      </label>
                      <div className="relative group/input">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within/input:text-violet-400 transition-colors" />
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full h-12 bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 text-white placeholder:text-white/20 focus:outline-none focus:border-violet-500/50 focus:bg-white/10 transition-all"
                          placeholder="admin@example.com"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-medium text-muted-foreground ml-1 uppercase tracking-wider">
                        Password
                      </label>
                      <div className="relative group/input">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within/input:text-violet-400 transition-colors" />
                        <input
                          type={showPassword ? "text" : "password"}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-full h-12 bg-white/5 border border-white/10 rounded-xl pl-12 pr-12 text-white placeholder:text-white/20 focus:outline-none focus:border-violet-500/50 focus:bg-white/10 transition-all"
                          placeholder="••••••••"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-white transition-colors"
                        >
                          {showPassword ? (
                            <EyeOff className="w-5 h-5" />
                          ) : (
                            <Eye className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between py-2">
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <div className="relative">
                        <input type="checkbox" className="peer sr-only" />
                        <div className="w-5 h-5 rounded border border-white/20 bg-white/5 peer-checked:bg-violet-500 peer-checked:border-violet-500 transition-all" />
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 peer-checked:opacity-100 text-white pointer-events-none transition-opacity">
                          <svg
                            width="10"
                            height="8"
                            viewBox="0 0 10 8"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M1 4L3.5 6.5L9 1"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                      </div>
                      <span className="text-sm text-muted-foreground group-hover:text-white/80 transition-colors">
                        Remember me
                      </span>
                    </label>
                    <a
                      href="#"
                      className="text-sm text-violet-400 hover:text-violet-300 transition-colors"
                    >
                      Forgot password?
                    </a>
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-12 bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 text-white font-semibold rounded-xl transition-all duration-300 transform active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed group relative overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {isLoading ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Authenticating...
                        </>
                      ) : (
                        <>
                          Sign In
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </span>
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  </Button>
                </form>

                <div className="text-center pt-2">
                  <p className="text-xs text-muted-foreground">
                    By signing in, you agree to our Terms & Privacy Policy
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-6 left-0 right-0 text-center pointer-events-none">
        <p className="text-xs text-white/20 font-mono">
          SECURE SYSTEM ACCESS • AUTHORIZED PERSONNEL ONLY
        </p>
      </div>
    </div>
  );
}
