"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Lock, Mail, AlertCircle, Loader2, Key } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [twoFactorToken, setTwoFactorToken] = useState("");
  const [rememberDevice, setRememberDevice] = useState(false);
  const [requires2FA, setRequires2FA] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          twoFactorToken: requires2FA ? twoFactorToken : undefined,
          rememberDevice: requires2FA ? rememberDevice : undefined
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Invalid credentials");
        return;
      }

      // Check if 2FA is required
      if (data.requires2FA) {
        setRequires2FA(true);
        setError("");
        return;
      }

      toast.success(`Welcome back, ${data.user.name}!`);
      router.push("/admin");
      router.refresh();
    } catch (err) {
      console.error("Login error:", err);
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <div className="w-16 h-16 bg-[#DB5858] rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-3xl">N</span>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-2xl font-bold text-center text-gray-900 mb-2">
            Admin Portal
          </h1>
          <p className="text-center text-gray-600 mb-8">
            {requires2FA
              ? "Enter your 2FA code from your authenticator app"
              : "Sign in to access the admin dashboard"}
          </p>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start"
            >
              <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 mr-2 flex-shrink-0" />
              <p className="text-sm text-red-700">{error}</p>
            </motion.div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {!requires2FA ? (
              <>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DB5858] focus:border-transparent"
                      placeholder="admin@nexus.com"
                      required
                      autoComplete="email"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DB5858] focus:border-transparent"
                      placeholder="••••••••"
                      required
                      autoComplete="current-password"
                    />
                  </div>
                </div>
              </>
            ) : (
              <>
                <div>
                  <label htmlFor="twoFactorToken" className="block text-sm font-medium text-gray-700 mb-1">
                    Two-Factor Authentication Code
                  </label>
                  <div className="relative">
                    <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      id="twoFactorToken"
                      type="text"
                      value={twoFactorToken}
                      onChange={(e) => setTwoFactorToken(e.target.value.replace(/\D/g, ""))}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-center text-2xl tracking-widest focus:outline-none focus:ring-2 focus:ring-[#DB5858] focus:border-transparent"
                      placeholder="000000"
                      maxLength={6}
                      required
                      autoComplete="one-time-code"
                      autoFocus
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-2 text-center">
                    Enter the 6-digit code from your authenticator app
                  </p>
                </div>

                <div className="flex items-center">
                  <input
                    id="rememberDevice"
                    type="checkbox"
                    checked={rememberDevice}
                    onChange={(e) => setRememberDevice(e.target.checked)}
                    className="w-4 h-4 text-[#DB5858] border-gray-300 rounded focus:ring-[#DB5858]"
                  />
                  <label htmlFor="rememberDevice" className="ml-2 block text-sm text-gray-700">
                    Remember this device for 7 days
                  </label>
                </div>
              </>
            )}

            <div className="flex gap-3">
              {requires2FA && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setRequires2FA(false);
                    setTwoFactorToken("");
                    setError("");
                  }}
                  className="flex-1"
                >
                  Back
                </Button>
              )}
              <Button
                type="submit"
                disabled={loading}
                className={`${requires2FA ? 'flex-1' : 'w-full'} bg-[#DB5858] hover:bg-[#c94848] text-white`}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    {requires2FA ? "Verifying..." : "Signing in..."}
                  </>
                ) : (
                  requires2FA ? "Verify & Sign In" : "Sign In"
                )}
              </Button>
            </div>
          </form>

          {/* Security Note */}
          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-600 text-center">
              <Lock className="inline w-3 h-3 mr-1" />
              This is a secure area. All login attempts are logged.
              <br />
              Unauthorized access is prohibited.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}