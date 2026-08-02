export default function Header() {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <header className="border-b border-amber-200 bg-amber-50/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-800">Sacrament Meetings</p>
          <h1 className="text-3xl font-bold text-stone-900">Canoas Centro Ward</h1>
        </div>
        <p className="text-sm font-medium text-stone-700">{today}</p>
      </div>
    </header>
  );
}
