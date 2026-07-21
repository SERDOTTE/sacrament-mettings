"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export function MeetingSearch() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");

    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }

    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <input
      type="search"
      placeholder="Search by speaker, leader, or meeting type..."
      defaultValue={searchParams.get("query")?.toString()}
      onChange={(event) => handleSearch(event.target.value)}
      aria-label="Search meetings"
      className="w-full rounded-md border border-amber-300 bg-white px-3 py-2 text-sm text-stone-900 outline-none ring-amber-300 transition focus:ring-2"
    />
  );
}