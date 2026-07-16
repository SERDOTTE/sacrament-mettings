import MeetingCard from "@/components/MeetingCard";
import type { SacramentMeeting } from "@/lib/types";
import { getBaseUrl } from "@/lib/server-url";

export const dynamic = "force-dynamic";

async function fetchMeetings(): Promise<SacramentMeeting[]> {
  const baseUrl = await getBaseUrl();
  const response = await fetch(`${baseUrl}/api/meetings`, { cache: "no-store" });

  if (!response.ok) {
    return [];
  }

  return (await response.json()) as SacramentMeeting[];
}

export default async function MeetingsPage() {
  const meetings = await fetchMeetings();

  return (
    <main>
      <h1 className="mb-4 text-3xl font-bold text-stone-900">All Sacrament Meetings</h1>
      {meetings.length === 0 ? (
        <p className="text-stone-700">No meetings available yet.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {meetings.map((meeting) => (
            <MeetingCard key={meeting.id} meeting={meeting} />
          ))}
        </div>
      )}
    </main>
  );
}
