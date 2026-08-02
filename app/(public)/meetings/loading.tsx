export default function MeetingsLoading() {
  return (
    <div className="grid gap-4" aria-live="polite" aria-busy="true">
      <p className="text-stone-700">Loading meetings...</p>
      <div className="h-24 animate-pulse rounded-2xl bg-amber-100" />
      <div className="h-24 animate-pulse rounded-2xl bg-amber-100" />
    </div>
  );
}
