import type { Metadata } from "next";

import FeedbackBanner from "@/components/FeedbackBanner";
import MeetingCard from "@/components/MeetingCard";
import { Pagination } from "@/components/Pagination";
import { MeetingSearch } from "@/components/MeetingSearch";
import { getMeetings, getMeetingsTotalPages } from "@/lib/meetings-db";

export const metadata: Metadata = {
  title: "All Meetings",
  description: "Browse all sacrament meeting programs with search and pagination.",
};

export const dynamic = "force-dynamic";

interface MeetingsPageProps {
  searchParams?: Promise<{ query?: string; page?: string; status?: string; action?: string }>;
}

function getFeedback(status: string | undefined, action: string | undefined) {
  if (status === "success" && action === "create") {
    return {
      message: "Meeting created successfully.",
      tone: "success" as const,
    };
  }

  if (status === "success" && action === "update") {
    return {
      message: "Meeting updated successfully.",
      tone: "success" as const,
    };
  }

  if (status === "success" && action === "delete") {
    return {
      message: "Meeting deleted successfully.",
      tone: "success" as const,
    };
  }

  if (status === "error" && action === "delete") {
    return {
      message: "Unable to delete the meeting. Please try again.",
      tone: "error" as const,
    };
  }

  return null;
}

export default async function MeetingsPage({ searchParams }: MeetingsPageProps) {
  const params = await searchParams;
  const query = params?.query ?? "";
  const currentPage = Number(params?.page) || 1;
  const feedback = getFeedback(params?.status, params?.action);

  const [meetings, totalPages] = await Promise.all([
    getMeetings(query, currentPage),
    getMeetingsTotalPages(query),
  ]);

  return (
    <main>
      <h1 className="mb-4 text-3xl font-bold text-stone-900">All Sacrament Meetings</h1>
      {feedback ? (
        <FeedbackBanner message={feedback.message} tone={feedback.tone} />
      ) : null}
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
