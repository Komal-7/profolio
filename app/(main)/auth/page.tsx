"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";

export default function AuthPage() {
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
              <form className="flex flex-col gap-4 w-full">
                <Input type="text" placeholder="Full Name" />
                <Input type="email" placeholder="Email" />
                <Input type="password" placeholder="Password" />
                <Button className="bg-[#0c7ff2] text-white mt-2 w-full">
                  Sign Up
                </Button>
              </form>
            </div>
          </TabsContent>

          <TabsContent value="signin">
            <div className="flex flex-col items-center gap-4">
              <h1 className="text-2xl font-bold text-[#0d141c] text-center mb-4">
                Welcome Back
              </h1>
              <form className="flex flex-col gap-4 w-full">
                <Input type="email" placeholder="Email" />
                <Input type="password" placeholder="Password" />
                <Button className="bg-[#0c7ff2] text-white mt-2 w-full">
                  Sign In
                </Button>
              </form>
            </div>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}
