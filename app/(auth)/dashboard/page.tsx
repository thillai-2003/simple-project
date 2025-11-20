//simple-project/app/(auth)/dashboard/page.tsx
'use client'

import { useSession } from "next-auth/react"
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { redirect } from "next/navigation";

export default function WelcomePage() {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      redirect("/signin");
    }
  }, [status]);

  return (
    <div className="min-h-screen flex items-center justify-center text-3xl font-bold">
      <div className="flex flex-col gap-6">
      <span>Welcome, {session?.user?.name}! 🎉</span>

      <Button className="" onClick={() => signOut({ callbackUrl: "/signin", redirect: true })}>Sign Out</Button>
      </div>
    </div>
  );
}