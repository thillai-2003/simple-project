//simple-project/app/(auth)/signup/page.tsx
"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner"
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSignup(e: any) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);

    const body = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
    };

    const res = await fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    setLoading(false);

    if (!res.ok) {
      toast.error(data.error);
      return;
    }

    await signIn("credentials", {
      email: body.email,
      password: body.password,
      redirect: false,
    });

    // redirect to welcome page
    window.location.href = `/dashboard`;
  }

  const login = () => {
    router.push("/signin");
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-4 shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Create Account</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSignup} className="space-y-4">

            <div>
              <Label htmlFor="name" className="mb-2">Name</Label>
              <Input id="name" name="name" placeholder="Your Name" required />
            </div>

            <div>
              <Label htmlFor="email" className="mb-2">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <Label htmlFor="password" className="mb-2">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="******"
                required
              />
            </div>

            <Button type="submit" disabled={loading} className="w-full">
              {loading ? "Creating..." : "Sign Up"}
            </Button>

            <div className="w-full h-[1px] bg-slate-500"></div>
            <div className="text-center w-full">Already have an account?</div>
          </form>
          <Button type="submit" className="w-full cursor-pointer text-center mt-4" onClick={login}>Log in</Button>
        </CardContent>
      </Card>
    </div>
  );
}
