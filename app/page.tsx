import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-6 py-12">
      <section className="grid items-center gap-8 rounded-3xl bg-linear-to-br from-amber-100 via-orange-50 to-stone-100 p-8 md:grid-cols-2">
        <div className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-900">WDD 430 - W02 Assignment</p>
          <h2 className="font-bold text-5xl leading-tight text-stone-900">Sacrament Meeting Planner</h2>
          <p className="max-w-xl text-lg text-stone-700">
            View upcoming agendas, navigate past programs, and print a clear program for each sacrament meeting.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/meetings"
              className="rounded-md bg-stone-900 px-5 py-3 text-sm font-semibold text-white hover:bg-stone-700"
            >
              Browse Meetings
            </Link>
            <Link
              href="/meetings/current"
              className="rounded-md border border-stone-400 bg-white px-5 py-3 text-sm font-semibold text-stone-900 hover:bg-stone-100"
            >
              Go to Current Sunday
            </Link>
          </div>
        </div>

        <Image
          src="/church.jpg"
          alt="Illustration representing a meeting program window"
          width={420}
          height={300}
          className="mx-auto rounded-2xl border border-amber-200"
          priority
        />
      </section>
    </main>
  );
}
