import MeetingCard from "@/components/MeetingCard";
import { Pagination } from "@/components/Pagination";
import { MeetingSearch } from "@/components/MeetingSearch";
import { getMeetings, getMeetingsTotalPages } from "@/lib/meetings-db";

export const dynamic = "force-dynamic";

interface MeetingsPageProps {
  searchParams?: Promise<{ query?: string; page?: string }>;
}

export default async function MeetingsPage({ searchParams }: MeetingsPageProps) {
  const params = await searchParams;
  const query = params?.query ?? "";
  const currentPage = Number(params?.page) || 1;

  const [meetings, totalPages] = await Promise.all([
    getMeetings(query, currentPage),
    getMeetingsTotalPages(query),
  ]);

  return (
    <main>
      <h1 className="mb-4 text-3xl font-bold text-stone-900">All Sacrament Meetings</h1>
      <div className="mb-5">
        <MeetingSearch />
      </div>

      {meetings.length === 0 ? (
        <p className="text-stone-700">No meetings available yet.</p>
      ) : (
        <>
          <div className="grid gap-4 md:grid-cols-2">
            {meetings.map((meeting) => (
              <MeetingCard key={meeting.id} meeting={meeting} />
            ))}
          </div>
          <Pagination totalPages={totalPages} />
        </>
      )}
    </main>
  );
}
