"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function SignInForm() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setError("");

        const form = e.target as HTMLFormElement;
        const email = (form.elements.namedItem("email") as HTMLInputElement).value;
        const password = (form.elements.namedItem("password") as HTMLInputElement).value;

        const res = await signIn("credentials", {
            redirect: false,
            email,
            password,
        });

        if (res?.error) {
            toast.error("Invalid email or password.");
            setLoading(false);
            return;
        }

        router.push("/dashboard");
    }

    const signup = () => {
        router.push("/signup");
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <Card className="w-full max-w-md shadow-xl rounded-2xl">
                <CardHeader>
                    <CardTitle className="text-center text-2xl font-bold">
                        Sign in to your account
                    </CardTitle>
                </CardHeader>

                <CardContent>
                    <form className="space-y-4" onSubmit={onSubmit}>
                        <div className="space-y-2">
                            <Label className="mb-2">Email</Label>
                            <Input
                                name="email"
                                type="email"
                                placeholder="you@example.com"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label className="mb-2">Password</Label>
                            <Input
                                name="password"
                                type="password"
                                placeholder="••••••••"
                                required
                            />
                        </div>

                        <Button
                            className="w-full"
                            disabled={loading}
                            type="submit"
                        >
                            {loading ? "Signing in..." : "Sign in"}
                        </Button>
                        <div className="w-full h-[1px] bg-slate-500"></div>
                        <div className="text-center w-full">Don't have an account?</div>
                    </form>
                    <Button type="submit" className="w-full cursor-pointer text-center mt-4" onClick={signup}>sign up</Button>
                </CardContent>
            </Card>
        </div>
    );
}
