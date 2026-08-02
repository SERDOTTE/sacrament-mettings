import Link from "next/link";

import { auth } from "@/auth";
import SignOutButton from "@/components/SignOutButton";

export default async function Header() {
  const session = await auth();
  const userEmail = session?.user?.email ?? "";

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <header className="border-b border-amber-200 bg-amber-50/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-800">Sacrament Meetings</p>
          <h1 className="text-3xl font-bold text-stone-900">Canoas Centro Ward</h1>
        </div>
        {session?.user ? (
          <div className="flex min-w-[18rem] flex-col items-center gap-1">
            <p className="text-sm font-semibold text-stone-800">Welcome {userEmail}</p>
            <div className="flex items-center gap-4">
              <p className="text-sm font-medium text-stone-700">{today}</p>
              <SignOutButton />
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <p className="text-sm font-medium text-stone-700">{today}</p>
            <Link
              href="/login"
              className="rounded-md border border-stone-300 bg-white px-3 py-2 text-sm font-semibold text-stone-800 hover:bg-stone-100"
            >
              Sign In
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
