"use client";

import { ModeSwitcher } from "@/components/mode-switcher";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const { data: session } = authClient.useSession();

  return (
    <>
      <header className="absolute top-0 right-0 flex justify-end items-center p-4">
        <ModeSwitcher />
      </header>
      <div className="flex flex-col gap-5 items-center justify-center h-screen px-5 text-center">
        <Image
          src="/better-auth-starter.png"
          alt="Better Auth"
          width={100}
          height={100}
          className="rounded-lg dark:invert"
        />

        <h1 className="text-4xl font-bold">Better Auth Starter</h1>

        <p className="text-lg">
          This is a starter project for Better Auth. It is a simple project that
          uses Better Auth to authenticate users.
        </p>

        <div className="flex flex-col items-center gap-4">
          {session?.user ? (
            <>
              <p className="text-lg text-gray-700 dark:text-gray-300">
                Welcome back, {session.user.name || session.user.email}!
              </p>
              <Link href="/dashboard">
                <Button size="lg">Go to Dashboard</Button>
              </Link>
            </>
          ) : (
            <div className="flex gap-2">
              <Link href="/login">
                <Button>Login</Button>
              </Link>
              <Link href="/signup">
                <Button>Signup</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
