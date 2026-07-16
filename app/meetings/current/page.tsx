import { redirect } from "next/navigation";

import { getMeetings } from "@/lib/meetings-db";

export const dynamic = "force-dynamic";

function toIsoDate(date: Date): string {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export default function CurrentMeetingPage() {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const sunday = new Date(today);
  sunday.setDate(today.getDate() - dayOfWeek);

  const sundayDate = toIsoDate(sunday);
  const match = getMeetings(sundayDate)[0];

  if (match) {
    redirect(`/meetings/${match.id}`);
  }

  redirect("/meetings");
}
