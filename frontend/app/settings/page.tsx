"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, User, Lock, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { api } from "@/lib/api";

export default function SettingsPage() {
  const router = useRouter();
  const { user, updateUser, logout } = useAuth();

  // Username form
  const [username, setUsername] = useState(user?.username || "");
  const [usernameLoading, setUsernameLoading] = useState(false);
  const [usernameError, setUsernameError] = useState("");
  const [usernameSuccess, setUsernameSuccess] = useState(false);

  // Password form
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState(false);

  const handleUsernameUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setUsernameError("");
    setUsernameSuccess(false);
    setUsernameLoading(true);

    try {
      const updatedUser = await api.updateUsername(username);
      updateUser(updatedUser);
      setUsernameSuccess(true);
      setTimeout(() => setUsernameSuccess(false), 3000);
    } catch (err) {
      setUsernameError(err instanceof Error ? err.message : "Failed to update username");
    } finally {
      setUsernameLoading(false);
    }
  };

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError("");
    setPasswordSuccess(false);

    if (newPassword !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }

    if (newPassword.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      return;
    }

    setPasswordLoading(true);

    try {
      await api.updatePassword(currentPassword, newPassword);
      setPasswordSuccess(true);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setTimeout(() => setPasswordSuccess(false), 3000);
    } catch (err) {
      setPasswordError(err instanceof Error ? err.message : "Failed to update password");
    } finally {
      setPasswordLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      return;
    }
    if (!confirm("This will delete all your portfolios. Are you absolutely sure?")) {
      return;
    }
    // For now, just logout - full delete would need backend endpoint
    alert("Account deletion is not yet implemented. Please contact support.");
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => router.push("/dashboard")}
          className="text-gray-500 hover:text-gray-700 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-[#0d141c]">Account Settings</h1>
          <p className="text-sm text-gray-500">{user?.email}</p>
        </div>
      </div>

      {/* Username Section */}
      <Card className="p-6 mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-blue-100 rounded-lg">
            <User className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h2 className="font-semibold text-[#0d141c]">Username</h2>
            <p className="text-sm text-gray-500">This appears in your public portfolio URLs</p>
          </div>
        </div>

        <form onSubmit={handleUsernameUpdate} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Username
            </label>
            <Input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="username"
              pattern="^[a-zA-Z0-9_-]+$"
              minLength={3}
              maxLength={50}
              required
            />
            <p className="text-xs text-gray-400 mt-1">
              Only letters, numbers, underscores, and hyphens
            </p>
          </div>

          {usernameError && (
            <p className="text-red-500 text-sm">{usernameError}</p>
          )}

          {usernameSuccess && (
            <p className="text-green-600 text-sm flex items-center gap-1">
              <Check className="w-4 h-4" />
              Username updated successfully
            </p>
          )}

          <Button
            type="submit"
            disabled={usernameLoading || username === user?.username}
            className="bg-[#0c7ff2] hover:bg-[#0a6dd4] text-white"
          >
            {usernameLoading ? "Saving..." : "Save Username"}
          </Button>
        </form>
      </Card>

      {/* Password Section */}
      <Card className="p-6 mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-amber-100 rounded-lg">
            <Lock className="w-5 h-5 text-amber-600" />
          </div>
          <div>
            <h2 className="font-semibold text-[#0d141c]">Password</h2>
            <p className="text-sm text-gray-500">Update your account password</p>
          </div>
        </div>

        <form onSubmit={handlePasswordUpdate} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Current Password
            </label>
            <Input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="Enter current password"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              New Password
            </label>
            <Input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
              minLength={6}
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Confirm New Password
            </label>
            <Input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
              required
            />
          </div>

          {passwordError && (
            <p className="text-red-500 text-sm">{passwordError}</p>
          )}

          {passwordSuccess && (
            <p className="text-green-600 text-sm flex items-center gap-1">
              <Check className="w-4 h-4" />
              Password updated successfully
            </p>
          )}

          <Button
            type="submit"
            disabled={passwordLoading}
            className="bg-[#0c7ff2] hover:bg-[#0a6dd4] text-white"
          >
            {passwordLoading ? "Updating..." : "Update Password"}
          </Button>
        </form>
      </Card>

      {/* Danger Zone */}
      <Card className="p-6 border-red-200">
        <h2 className="font-semibold text-red-600 mb-2">Danger Zone</h2>
        <p className="text-sm text-gray-500 mb-4">
          Once you delete your account, there is no going back. Please be certain.
        </p>
        <Button
          variant="outline"
          className="text-red-600 border-red-300 hover:bg-red-50"
          onClick={handleDeleteAccount}
        >
          Delete Account
        </Button>
      </Card>
    </div>
  );
}
