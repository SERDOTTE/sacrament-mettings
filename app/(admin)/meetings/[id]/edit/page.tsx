import { notFound } from "next/navigation";

import MeetingEditForm from "@/components/MeetingEditForm";
import { getMeetingById } from "@/lib/meetings-db";

interface EditMeetingPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditMeetingPage({ params }: EditMeetingPageProps) {
  const { id } = await params;
  const numericId = Number(id);

  if (!Number.isInteger(numericId)) {
    notFound();
  }

  const meeting = await getMeetingById(numericId);

  if (!meeting) {
    notFound();
  }

  return (
    <main className="space-y-4">
      <h1 className="text-3xl font-bold text-stone-900">Edit Meeting</h1>
      <p className="text-stone-700">Update the sacrament meeting details.</p>
      <MeetingEditForm meeting={meeting} />
    </main>
  );
}