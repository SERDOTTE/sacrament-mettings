import Link from "next/link";
import { notFound } from "next/navigation";

import MeetingDetail from "@/components/MeetingDetail";
import PrintButton from "@/components/PrintButton";
import { getBaseUrl } from "@/lib/server-url";
import type { SacramentMeeting } from "@/lib/types";

interface MeetingDetailPageProps {
  params: Promise<{ id: string }>;
}

export const dynamic = "force-dynamic";

async function fetchMeeting(id: string): Promise<SacramentMeeting | null> {
  const baseUrl = await getBaseUrl();
  const response = await fetch(`${baseUrl}/api/meetings/${id}`, { cache: "no-store" });

  if (response.status === 400 || response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error("Failed to fetch meeting.");
  }

  return (await response.json()) as SacramentMeeting;
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
