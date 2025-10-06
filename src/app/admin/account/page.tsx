"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  User as UserIcon,
  Mail,
  Phone,
  Shield,
  Lock,
  Key,
  AlertCircle,
  CheckCircle,
  Download,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  phoneNumber?: string;
  twoFactorEnabled: boolean;
  emailVerified: boolean;
}

export default function AccountPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [show2FASetup, setShow2FASetup] = useState(false);
  const [qrCode, setQrCode] = useState("");
  const [secret, setSecret] = useState("");
  const [backupCodes, setBackupCodes] = useState<string[]>([]);
  const [verificationCode, setVerificationCode] = useState("");
  const [setupStep, setSetupStep] = useState(1);

  // Form states
  const [editingEmail, setEditingEmail] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [showEmailVerification, setShowEmailVerification] = useState(false);
  const [emailVerificationCode, setEmailVerificationCode] = useState("");
  const [editingPhone, setEditingPhone] = useState(false);
  const [newPhone, setNewPhone] = useState("");
  const [changingPassword, setChangingPassword] = useState(false);
  const [showPasswordVerification, setShowPasswordVerification] = useState(false);
  const [passwordVerificationCode, setPasswordVerificationCode] = useState("");
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const response = await fetch("/api/auth/me");
      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        setNewEmail(data.user.email);
        setNewPhone(data.user.phoneNumber || "");
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      toast.error("Failed to load account information");
    } finally {
      setLoading(false);
    }
  };

  const handleSetup2FA = async () => {
    try {
      const response = await fetch("/api/auth/2fa/setup", {
        method: "POST",
      });

      if (response.ok) {
        const data = await response.json();
        setQrCode(data.qrCode);
        setSecret(data.secret);
        setBackupCodes(data.backupCodes);
        setShow2FASetup(true);
        setSetupStep(1);
      } else {
        const data = await response.json();
        toast.error(data.error || "Failed to setup 2FA");
      }
    } catch (error) {
      console.error("Error setting up 2FA:", error);
      toast.error("Error setting up 2FA");
    }
  };

  const handleVerify2FA = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/auth/2fa/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: verificationCode }),
      });

      if (response.ok) {
        toast.success("2FA enabled successfully!");
        setShow2FASetup(false);
        setVerificationCode("");
        fetchUser();
      } else {
        const data = await response.json();
        toast.error(data.error || "Invalid code");
      }
    } catch (error) {
      console.error("Error verifying 2FA:", error);
      toast.error("Error verifying 2FA");
    }
  };

  const handleDisable2FA = async () => {
    const password = prompt("Enter your password to disable 2FA:");
    if (!password) return;

    try {
      const response = await fetch("/api/auth/2fa/disable", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (response.ok) {
        toast.success("2FA disabled successfully");
        fetchUser();
      } else {
        const data = await response.json();
        toast.error(data.error || "Failed to disable 2FA");
      }
    } catch (error) {
      console.error("Error disabling 2FA:", error);
      toast.error("Error disabling 2FA");
    }
  };

  const handleUpdateEmail = async () => {
    try {
      // Send verification code
      const response = await fetch("/api/auth/verify-email-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: newEmail }),
      });

      if (response.ok) {
        toast.success("Verification code sent to your new email!");
        // Show verification code input (you'll need to add state for this)
        setShowEmailVerification(true);
      } else {
        const data = await response.json();
        toast.error(data.error || "Failed to send verification code");
      }
    } catch (error) {
      console.error("Error sending verification code:", error);
      toast.error("Error sending verification code");
    }
  };

  const handleVerifyEmail = async (code: string) => {
    try {
      const response = await fetch("/api/auth/verify-email-code", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: newEmail, code }),
      });

      if (response.ok) {
        toast.success("Email verified and updated successfully!");
        setEditingEmail(false);
        setShowEmailVerification(false);
        setEmailVerificationCode("");
        fetchUser();
      } else {
        const data = await response.json();
        toast.error(data.error || "Invalid verification code");
      }
    } catch (error) {
      console.error("Error verifying email:", error);
      toast.error("Error verifying email");
    }
  };

  const handleUpdatePhone = async () => {
    try {
      const response = await fetch(`/api/admin/users/${user?.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phoneNumber: newPhone }),
      });

      if (response.ok) {
        toast.success("Phone number updated successfully");
        setEditingPhone(false);
        fetchUser();
      } else {
        const data = await response.json();
        toast.error(data.error || "Failed to update phone number");
      }
    } catch (error) {
      console.error("Error updating phone:", error);
      toast.error("Error updating phone number");
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      // Request password change code
      const response = await fetch("/api/auth/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          oldPassword: passwordData.oldPassword,
          newPassword: passwordData.newPassword,
        }),
      });

      if (response.ok) {
        toast.success("Verification code sent to your email!");
        setShowPasswordVerification(true);
      } else {
        const data = await response.json();
        toast.error(data.error || "Failed to send verification code");
      }
    } catch (error) {
      console.error("Error requesting password change:", error);
      toast.error("Error requesting password change");
    }
  };

  const handleVerifyPasswordChange = async (code: string) => {
    try {
      const response = await fetch("/api/auth/change-password", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code,
          newPassword: passwordData.newPassword,
        }),
      });

      if (response.ok) {
        toast.success("Password changed successfully!");
        setChangingPassword(false);
        setShowPasswordVerification(false);
        setPasswordVerificationCode("");
        setPasswordData({
          oldPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      } else {
        const data = await response.json();
        toast.error(data.error || "Invalid verification code");
      }
    } catch (error) {
      console.error("Error verifying password change:", error);
      toast.error("Error verifying password change");
    }
  };

  const downloadBackupCodes = () => {
    const content = `Nexus Admin - 2FA Backup Codes\nGenerated: ${new Date().toLocaleString()}\n\nKeep these codes safe. Each code can only be used once.\n\n${backupCodes.join("\n")}`;
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "nexus-2fa-backup-codes.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 rounded w-64"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Account Settings</h1>
            <p className="text-gray-600 mt-1">
              Manage your account information and security settings
            </p>
          </div>

          {/* Profile Information */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <UserIcon className="w-5 h-5 mr-2 text-[#DB5858]" />
              Profile Information
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={user?.name || ""}
                  disabled
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center justify-between">
                  <span className="flex items-center">
                    <Mail className="w-4 h-4 mr-2" />
                    Email Address
                  </span>
                  {user?.emailVerified ? (
                    <Badge className="bg-green-100 text-green-800">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Verified
                    </Badge>
                  ) : (
                    <Badge className="bg-yellow-100 text-yellow-800">
                      <AlertCircle className="w-3 h-3 mr-1" />
                      Not Verified
                    </Badge>
                  )}
                </label>
                {editingEmail ? (
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <input
                        type="email"
                        value={newEmail}
                        onChange={(e) => setNewEmail(e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DB5858]"
                        disabled={showEmailVerification}
                      />
                      {!showEmailVerification && (
                        <>
                          <Button onClick={handleUpdateEmail} size="sm">
                            Send Code
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setEditingEmail(false);
                              setNewEmail(user?.email || "");
                            }}
                          >
                            Cancel
                          </Button>
                        </>
                      )}
                    </div>
                    {showEmailVerification && (
                      <div className="space-y-2">
                        <p className="text-sm text-gray-600">
                          Enter the 6-digit code sent to {newEmail}
                        </p>
                        <div className="flex items-center space-x-2">
                          <input
                            type="text"
                            value={emailVerificationCode}
                            onChange={(e) => setEmailVerificationCode(e.target.value.replace(/\D/g, ""))}
                            maxLength={6}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-center text-2xl tracking-widest focus:outline-none focus:ring-2 focus:ring-[#DB5858]"
                            placeholder="000000"
                          />
                          <Button onClick={() => handleVerifyEmail(emailVerificationCode)} size="sm">
                            Verify
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setShowEmailVerification(false);
                              setEmailVerificationCode("");
                              setEditingEmail(false);
                              setNewEmail(user?.email || "");
                            }}
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-900">{user?.email}</span>
                      <div className="flex items-center space-x-2">
                        {!user?.emailVerified && (
                          <Button
                            size="sm"
                            onClick={() => {
                              setNewEmail(user?.email || "");
                              setEditingEmail(true);
                            }}
                            className="bg-[#DB5858] hover:bg-[#c94848]"
                          >
                            Verify Email
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setEditingEmail(true)}
                        >
                          Change
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                  <Phone className="w-4 h-4 mr-2" />
                  Phone Number
                </label>
                {editingPhone ? (
                  <div className="flex items-center space-x-2">
                    <input
                      type="tel"
                      value={newPhone}
                      onChange={(e) => setNewPhone(e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DB5858]"
                      placeholder="(555) 123-4567"
                    />
                    <Button onClick={handleUpdatePhone} size="sm">
                      Save
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setEditingPhone(false);
                        setNewPhone(user?.phoneNumber || "");
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <span className="text-gray-900">
                      {user?.phoneNumber || "Not set"}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setEditingPhone(true)}
                    >
                      {user?.phoneNumber ? "Change" : "Add"}
                    </Button>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Role
                </label>
                <Badge className="bg-blue-100 text-blue-800">{user?.role}</Badge>
              </div>
            </div>
          </div>

          {/* Security Settings */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Shield className="w-5 h-5 mr-2 text-[#DB5858]" />
              Security Settings
            </h2>

            <div className="space-y-6">
              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <Lock className="w-4 h-4 mr-2 text-gray-500" />
                    <span className="text-sm font-medium text-gray-700">Password</span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setChangingPassword(!changingPassword)}
                  >
                    Change Password
                  </Button>
                </div>

                {changingPassword && (
                  <div className="mt-4 space-y-3 p-4 bg-gray-50 rounded-lg">
                    {!showPasswordVerification ? (
                      <form onSubmit={handleChangePassword} className="space-y-3">
                        <div>
                          <input
                            type="password"
                            placeholder="Current Password"
                            value={passwordData.oldPassword}
                            onChange={(e) =>
                              setPasswordData({ ...passwordData, oldPassword: e.target.value })
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DB5858]"
                            required
                            minLength={8}
                          />
                        </div>
                        <div>
                          <input
                            type="password"
                            placeholder="New Password"
                            value={passwordData.newPassword}
                            onChange={(e) =>
                              setPasswordData({ ...passwordData, newPassword: e.target.value })
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DB5858]"
                            required
                            minLength={8}
                          />
                        </div>
                        <div>
                          <input
                            type="password"
                            placeholder="Confirm New Password"
                            value={passwordData.confirmPassword}
                            onChange={(e) =>
                              setPasswordData({ ...passwordData, confirmPassword: e.target.value })
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DB5858]"
                            required
                            minLength={8}
                          />
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button type="submit" size="sm">
                            Send Verification Code
                          </Button>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setChangingPassword(false);
                              setPasswordData({
                                oldPassword: "",
                                newPassword: "",
                                confirmPassword: "",
                              });
                            }}
                          >
                            Cancel
                          </Button>
                        </div>
                      </form>
                    ) : (
                      <div className="space-y-3">
                        <p className="text-sm text-gray-600">
                          Enter the 6-digit code sent to {user?.email}
                        </p>
                        <div className="flex items-center space-x-2">
                          <input
                            type="text"
                            value={passwordVerificationCode}
                            onChange={(e) => setPasswordVerificationCode(e.target.value.replace(/\D/g, ""))}
                            maxLength={6}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-center text-2xl tracking-widest focus:outline-none focus:ring-2 focus:ring-[#DB5858]"
                            placeholder="000000"
                          />
                          <Button onClick={() => handleVerifyPasswordChange(passwordVerificationCode)} size="sm">
                            Verify
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setShowPasswordVerification(false);
                              setPasswordVerificationCode("");
                              setChangingPassword(false);
                              setPasswordData({
                                oldPassword: "",
                                newPassword: "",
                                confirmPassword: "",
                              });
                            }}
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* 2FA */}
              <div className="border-t border-gray-200 pt-6">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <div className="flex items-center">
                      <Key className="w-4 h-4 mr-2 text-gray-500" />
                      <span className="text-sm font-medium text-gray-700">
                        Two-Factor Authentication
                      </span>
                      {user?.twoFactorEnabled ? (
                        <Badge className="ml-2 bg-green-100 text-green-800">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Enabled
                        </Badge>
                      ) : (
                        <Badge className="ml-2 bg-gray-100 text-gray-600">
                          <AlertCircle className="w-3 h-3 mr-1" />
                          Disabled
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Add an extra layer of security to your account
                    </p>
                  </div>
                  {user?.twoFactorEnabled ? (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleDisable2FA}
                    >
                      Disable 2FA
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      onClick={handleSetup2FA}
                      className="bg-[#DB5858] hover:bg-[#c94848]"
                    >
                      Enable 2FA
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* 2FA Setup Modal */}
      {show2FASetup && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75"
              onClick={() => setShow2FASetup(false)}
            ></div>

            <div className="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full z-50">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Setup Two-Factor Authentication
                </h3>

                {setupStep === 1 && (
                  <div className="space-y-4">
                    <div className="text-center">
                      <p className="text-sm text-gray-600 mb-4">
                        Scan this QR code with your authenticator app (Google Authenticator, Authy, etc.)
                      </p>
                      {qrCode && (
                        <img
                          src={qrCode}
                          alt="2FA QR Code"
                          className="mx-auto w-64 h-64"
                        />
                      )}
                      <p className="text-xs text-gray-500 mt-4">
                        Can&apos;t scan? Enter this key manually: <br />
                        <code className="bg-gray-100 px-2 py-1 rounded">{secret}</code>
                      </p>
                    </div>

                    <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-200">
                      <Button
                        variant="outline"
                        onClick={() => setShow2FASetup(false)}
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={() => setSetupStep(2)}
                        className="bg-[#DB5858] hover:bg-[#c94848]"
                      >
                        Next: Save Backup Codes
                      </Button>
                    </div>
                  </div>
                )}

                {setupStep === 2 && (
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-600 mb-4">
                        Save these backup codes in a safe place. You can use them to access your account if you lose your authenticator device.
                      </p>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="grid grid-cols-2 gap-2 font-mono text-sm">
                          {backupCodes.map((code, index) => (
                            <div key={index} className="text-center py-1">
                              {code}
                            </div>
                          ))}
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={downloadBackupCodes}
                        className="mt-2 w-full"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download Backup Codes
                      </Button>
                    </div>

                    <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-200">
                      <Button
                        variant="outline"
                        onClick={() => setSetupStep(1)}
                      >
                        Back
                      </Button>
                      <Button
                        onClick={() => setSetupStep(3)}
                        className="bg-[#DB5858] hover:bg-[#c94848]"
                      >
                        Next: Verify
                      </Button>
                    </div>
                  </div>
                )}

                {setupStep === 3 && (
                  <form onSubmit={handleVerify2FA} className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-600 mb-4">
                        Enter the 6-digit code from your authenticator app to verify setup.
                      </p>
                      <input
                        type="text"
                        value={verificationCode}
                        onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, ""))}
                        maxLength={6}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-center text-2xl tracking-widest focus:outline-none focus:ring-2 focus:ring-[#DB5858]"
                        placeholder="000000"
                        required
                      />
                    </div>

                    <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-200">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setSetupStep(2)}
                      >
                        Back
                      </Button>
                      <Button
                        type="submit"
                        className="bg-[#DB5858] hover:bg-[#c94848]"
                      >
                        Verify & Enable 2FA
                      </Button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}