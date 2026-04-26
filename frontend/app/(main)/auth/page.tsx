"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";

export default function AuthPage() {
  const router = useRouter();
  const { user, signup, login } = useAuth();

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  }, [user, router]);

  // Signup form state
  const [signupUsername, setSignupUsername] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupError, setSignupError] = useState("");
  const [signupLoading, setSignupLoading] = useState(false);

  // Login form state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setSignupError("");
    setSignupLoading(true);

    try {
      await signup(signupUsername, signupEmail, signupPassword);
      router.push("/dashboard");
    } catch (err) {
      setSignupError(err instanceof Error ? err.message : "Signup failed");
    } finally {
      setSignupLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    setLoginLoading(true);

    try {
      await login(loginEmail, loginPassword);
      router.push("/dashboard");
    } catch (err) {
      setLoginError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoginLoading(false);
    }
  };

  return (
    <div className="h-screen overflow-hidden flex items-center justify-center bg-[#f8f9fb] px-4">
      <Card className="w-full max-w-md border-none shadow-none flex flex-col p-6">
        <Tabs defaultValue="signup" className="w-full">
          <div className="flex justify-center mb-6">
            <TabsList className="bg-[#f0f2f5] rounded-lg w-[fit-content]">
              <TabsTrigger value="signup" className="px-6 text-center">
                Sign Up
              </TabsTrigger>
              <TabsTrigger value="signin" className="px-6 text-center">
                Sign In
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="signup">
            <div className="flex flex-col items-center gap-4">
              <h1 className="text-2xl font-bold text-[#0d141c] text-center mb-4">
                Create Account
              </h1>
              <form onSubmit={handleSignup} className="flex flex-col gap-4 w-full">
                <Input
                  type="text"
                  placeholder="Username"
                  value={signupUsername}
                  onChange={(e) => setSignupUsername(e.target.value)}
                  required
                  minLength={3}
                />
                <Input
                  type="email"
                  placeholder="Email"
                  value={signupEmail}
                  onChange={(e) => setSignupEmail(e.target.value)}
                  required
                />
                <Input
                  type="password"
                  placeholder="Password"
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)}
                  required
                  minLength={6}
                />
                {signupError && (
                  <p className="text-red-500 text-sm text-center">{signupError}</p>
                )}
                <Button
                  type="submit"
                  className="bg-[#0c7ff2] text-white mt-2 w-full"
                  disabled={signupLoading}
                >
                  {signupLoading ? "Creating account..." : "Sign Up"}
                </Button>
              </form>
            </div>
          </TabsContent>

          <TabsContent value="signin">
            <div className="flex flex-col items-center gap-4">
              <h1 className="text-2xl font-bold text-[#0d141c] text-center mb-4">
                Welcome Back
              </h1>
              <form onSubmit={handleLogin} className="flex flex-col gap-4 w-full">
                <Input
                  type="email"
                  placeholder="Email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  required
                />
                <Input
                  type="password"
                  placeholder="Password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  required
                />
                {loginError && (
                  <p className="text-red-500 text-sm text-center">{loginError}</p>
                )}
                <Button
                  type="submit"
                  className="bg-[#0c7ff2] text-white mt-2 w-full"
                  disabled={loginLoading}
                >
                  {loginLoading ? "Signing in..." : "Sign In"}
                </Button>
              </form>
            </div>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}
