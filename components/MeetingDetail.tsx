import type { SacramentMeeting } from "@/lib/types";

interface MeetingDetailProps {
  meeting: SacramentMeeting;
}

export default function MeetingDetail({ meeting }: MeetingDetailProps) {
  return (
    <article className="rounded-2xl border border-amber-200 bg-white p-6 shadow-sm print:shadow-none">
      <header className="mb-6 border-b border-amber-100 pb-4">
        <h2 className="text-3xl font-bold text-stone-900">Sacrament Meeting Program</h2>
        <p className="text-stone-700">Date: {meeting.date}</p>
        <p className="text-stone-700">Meeting type: {meeting.meetingType}</p>
      </header>

      <section className="grid gap-5">
        <p>
          <strong>Presiding:</strong> {meeting.presiding}
        </p>
        <p>
          <strong>Conducting:</strong> {meeting.conducting}
        </p>

        {meeting.announcements && meeting.announcements.length > 0 ? (
          <div>
            <h3 className="mb-2 text-xl font-semibold text-stone-900">Announcements</h3>
            <ul className="list-disc pl-6">
              {meeting.announcements.map((announcement) => (
                <li key={announcement}>{announcement}</li>
              ))}
            </ul>
          </div>
        ) : null}

        <div>
          <h3 className="mb-1 text-xl font-semibold text-stone-900">Opening</h3>
          <p>
            Hymn #{meeting.openingHymn.number}: {meeting.openingHymn.title}
          </p>
          <p>Prayer: {meeting.openingPrayer}</p>
        </div>

        <div>
          <h3 className="mb-2 text-xl font-semibold text-stone-900">Ward Business</h3>
          {meeting.wardBusiness.length > 0 ? (
            <ul className="list-disc pl-6">
              {meeting.wardBusiness.map((item) => (
                <li key={item.description}>{item.description}</li>
              ))}
            </ul>
          ) : (
            <p>No ward business this week.</p>
          )}
          <p className="mt-2">Stake business: {meeting.stakeBusiness ? "Yes" : "No"}</p>
        </div>

        <div>
          <h3 className="mb-1 text-xl font-semibold text-stone-900">Sacrament</h3>
          <p>
            Hymn #{meeting.sacramentHymn.number}: {meeting.sacramentHymn.title}
          </p>
        </div>

        <div>
          <h3 className="mb-2 text-xl font-semibold text-stone-900">Speakers and Music</h3>
          <ul className="list-disc pl-6">
            {meeting.speakers.map((item, index) => (
              <li key={`${meeting.id}-${item.name}-${index}`}>
                {item.type === "musical-number" ? "Musical Number" : "Speaker"}: {item.name}
                {item.topic ? ` - ${item.topic}` : ""}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-1 text-xl font-semibold text-stone-900">Closing</h3>
          <p>
            Hymn #{meeting.closingHymn.number}: {meeting.closingHymn.title}
          </p>
          <p>Prayer: {meeting.closingPrayer}</p>
        </div>
      </section>
    </article>
  );
}
