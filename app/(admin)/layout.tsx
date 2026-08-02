import type { ReactNode } from "react";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <section className="mx-auto w-full max-w-6xl flex-1 px-6 py-8">
      <div className="mb-6 rounded-2xl border border-stone-300 bg-stone-50 p-4">
        <h2 className="text-lg font-semibold text-stone-900">Admin Area</h2>
        <p className="text-sm text-stone-700">Authentication and admin tooling will be added in Week 05.</p>
      </div>
      {children}
    </section>
  );
}