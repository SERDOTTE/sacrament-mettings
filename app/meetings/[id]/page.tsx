import Link from "next/link";
import { notFound } from "next/navigation";

import MeetingDetail from "@/components/MeetingDetail";
import PrintButton from "@/components/PrintButton";
import { getMeetingById } from "@/lib/meetings-db";
import type { SacramentMeeting } from "@/lib/types";

interface MeetingDetailPageProps {
  params: Promise<{ id: string }>;
}

export const dynamic = "force-dynamic";

async function fetchMeeting(id: string): Promise<SacramentMeeting | null> {
  const numericId = Number(id);

  if (!Number.isInteger(numericId)) {
    return null;
  }

  return getMeetingById(numericId);
}

export default async function MeetingDetailPage({ params }: MeetingDetailPageProps) {
  const { id } = await params;
  const meeting = await fetchMeeting(id);

  if (!meeting) {
    notFound();
  }

  return (
    <main className="space-y-4">
      <div className="flex flex-wrap items-center gap-3 print:hidden">
        <Link href="/meetings" className="rounded-md border border-amber-300 bg-white px-3 py-2 text-sm font-semibold text-amber-900 hover:bg-amber-100">
          Back to Meetings
        </Link>
        <PrintButton />
      </div>
      <MeetingDetail meeting={meeting} />
    </main>
  );
}
