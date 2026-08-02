import type { Metadata } from "next";

import LoginForm from "@/components/LoginForm";

export const metadata: Metadata = {
  title: "Login",
  description: "Sign in to manage sacrament meetings.",
};

export default function LoginPage() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 items-center px-6 py-12">
      <section className="mx-auto w-full max-w-md rounded-2xl border border-amber-200 bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-stone-900">Sign In</h1>
        <p className="mt-1 text-sm text-stone-700">Use the owner account to create, edit, and delete meetings.</p>
        <div className="mt-6">
          <LoginForm />
        </div>
      </section>
    </main>
  );
}
