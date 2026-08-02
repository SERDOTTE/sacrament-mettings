import type { ReactNode } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Meetings Admin",
  description: "Protected area for meeting management.",
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <section className="mx-auto w-full max-w-6xl flex-1 px-6 py-8">{children}</section>
  );
}