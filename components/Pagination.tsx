"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

interface PaginationProps {
  totalPages: number;
}

export function Pagination({ totalPages }: PaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  if (totalPages <= 1) {
    return null;
  }

  function createPageURL(page: number): string {
    const params = new URLSearchParams(searchParams);
    params.set("page", String(page));
    return `${pathname}?${params.toString()}`;
  }

  return (
    <nav aria-label="Pagination" className="mt-6 flex items-center justify-between gap-3">
      {currentPage > 1 ? (
        <Link
          href={createPageURL(currentPage - 1)}
          className="rounded-md border border-amber-300 bg-white px-3 py-2 text-sm font-semibold text-amber-900 hover:bg-amber-100"
        >
          Previous
        </Link>
      ) : (
        <span className="rounded-md border border-stone-200 bg-stone-100 px-3 py-2 text-sm font-semibold text-stone-400">
          Previous
        </span>
      )}

      <span className="text-sm font-semibold text-stone-700">
        Page {currentPage} of {totalPages}
      </span>

      {currentPage < totalPages ? (
        <Link
          href={createPageURL(currentPage + 1)}
          className="rounded-md border border-amber-300 bg-white px-3 py-2 text-sm font-semibold text-amber-900 hover:bg-amber-100"
        >
          Next
        </Link>
      ) : (
        <span className="rounded-md border border-stone-200 bg-stone-100 px-3 py-2 text-sm font-semibold text-stone-400">
          Next
        </span>
      )}
    </nav>
  );
}