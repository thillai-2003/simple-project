//simple-project/app/(auth)/layout.tsx
"use client";

import { SessionProvider } from "next-auth/react";
import { Toaster } from "@/components/ui/sonner";

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {

    return (
        <SessionProvider>
        { children }
        <Toaster/>
        </SessionProvider>
    );
}
