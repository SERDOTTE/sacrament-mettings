import Link from "next/link";

import { deleteMeeting } from "@/lib/actions";
import type { SacramentMeeting } from "@/lib/types";

interface MeetingCardProps {
  meeting: SacramentMeeting;
}

function labelMeetingType(type: SacramentMeeting["meetingType"]): string {
  return type.charAt(0).toUpperCase() + type.slice(1);
}

export default function MeetingCard({ meeting }: MeetingCardProps) {
  return (
    <article className="rounded-2xl border border-amber-200 bg-white p-5 shadow-sm">
      <div className="mb-3 flex items-start justify-between gap-3">
        <h3 className="text-xl font-bold text-stone-900">{meeting.date}</h3>
        <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-amber-800">
          {labelMeetingType(meeting.meetingType)}
        </span>
      </div>
      <p className="text-sm text-stone-700">Presiding: {meeting.presiding}</p>
      <p className="text-sm text-stone-700">Conducting: {meeting.conducting}</p>
      <p className="mt-2 text-sm text-stone-700">
        Opening hymn: #{meeting.openingHymn.number} {meeting.openingHymn.title}
      </p>
      <div className="mt-4 flex flex-wrap gap-3">
        <Link
          href={`/meetings/${meeting.id}`}
          className="inline-flex rounded-md bg-stone-900 px-4 py-2 text-sm font-semibold text-white hover:bg-stone-700"
        >
          View Full Program
        </Link>
        <Link
          href={`/meetings/${meeting.id}/edit`}
          className="inline-flex rounded-md border border-stone-300 px-4 py-2 text-sm font-semibold text-stone-900 hover:bg-stone-100"
        >
          Edit
        </Link>
        <form action={deleteMeeting}>
          <input type="hidden" name="id" value={meeting.id} />
          <button
            type="submit"
            className="rounded-md border border-red-300 px-4 py-2 text-sm font-semibold text-red-700 hover:bg-red-50"
          >
            Delete
          </button>
        </form>
      </div>
    </article>
  );
}
