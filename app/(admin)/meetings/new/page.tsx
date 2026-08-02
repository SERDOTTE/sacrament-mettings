import MeetingForm from "@/components/MeetingForm";

export default function NewMeetingPage() {
  return (
    <main className="space-y-4">
      <h1 className="text-3xl font-bold text-stone-900">Create Meeting</h1>
      <p className="text-stone-700">Add a new sacrament meeting program.</p>
      <MeetingForm />
    </main>
  );
}