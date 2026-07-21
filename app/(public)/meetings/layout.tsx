import type { ReactNode } from "react";

import NavLinks from "@/components/NavLinks";

export default function MeetingsLayout({ children }: { children: ReactNode }) {
  return (
    <section className="mx-auto w-full max-w-6xl flex-1 px-6 py-8">
      <div className="mb-6 rounded-2xl border border-amber-200 bg-amber-50 p-4">
        <h2 className="mb-3 text-lg font-semibold text-stone-900">Meetings Section</h2>
        <NavLinks />
      </div>
      {children}
    </section>
  );
}
