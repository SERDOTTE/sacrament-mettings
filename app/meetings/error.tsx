'use client';

import Link from 'next/link';

export default function MeetingsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="space-y-4">
      <h2 className="text-2xl font-semibold text-stone-900">Something went wrong.</h2>
      <p className="text-stone-700">{error.message || 'Unable to load the meetings list right now.'}</p>
      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => reset()}
          className="rounded-md bg-stone-900 px-4 py-2 text-sm font-semibold text-white"
        >
          Try Again
        </button>
        <Link href="/meetings" className="rounded-md border border-stone-300 px-4 py-2 text-sm font-semibold text-stone-900">
          Back to meetings
        </Link>
      </div>
    </main>
  );
}
