import Link from "next/link";

export default function MeetingNotFound() {
  return (
    <main className="space-y-4">
      <h2 className="text-2xl font-semibold text-stone-900">Meeting not found</h2>
      <p className="text-stone-700">The requested meeting could not be found.</p>
      <Link href="/meetings" className="inline-flex rounded-md bg-stone-900 px-4 py-2 text-sm font-semibold text-white">
        Back to meetings
      </Link>
    </main>
  );
}
