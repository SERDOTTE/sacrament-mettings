"use client";

import { useActionState } from "react";

import { authenticate } from "@/lib/actions";

const initialState = "";

export default function LoginForm() {
  const [errorMessage, formAction, isPending] = useActionState(authenticate, initialState);

  return (
    <form action={formAction} className="space-y-4">
      <div className="space-y-1">
        <label htmlFor="email" className="block text-sm font-semibold text-stone-800">
          Email
        </label>
        <input
          id="email"
          type="email"
          name="email"
          required
          className="w-full rounded-md border border-stone-300 bg-white px-3 py-2 text-stone-900 outline-none ring-amber-300 focus:ring"
        />
      </div>

      <div className="space-y-1">
        <label htmlFor="password" className="block text-sm font-semibold text-stone-800">
          Password
        </label>
        <input
          id="password"
          type="password"
          name="password"
          minLength={6}
          required
          className="w-full rounded-md border border-stone-300 bg-white px-3 py-2 text-stone-900 outline-none ring-amber-300 focus:ring"
        />
      </div>

      <button
        aria-disabled={isPending}
        type="submit"
        className="w-full rounded-md bg-stone-900 px-4 py-2 text-sm font-semibold text-white hover:bg-stone-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending ? "Signing in..." : "Sign In"}
      </button>

      {errorMessage ? (
        <p role="alert" className="text-sm font-medium text-red-700">
          {errorMessage}
        </p>
      ) : null}
    </form>
  );
}
