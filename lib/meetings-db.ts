import type { SacramentMeeting } from "@/lib/types";

const meetings: SacramentMeeting[] = [
  {
    id: 1,
    date: "2026-05-03",
    meetingType: "regular",
    presiding: "Bishop Smith",
    conducting: "Brother Jones",
    announcements: ["Ward temple night: May 10", "Tithing declaration appointments open"],
    openingHymn: { number: 2, title: "The Spirit of God" },
    openingPrayer: "Sister Williams",
    wardBusiness: [{ description: "Sustaining of new Primary president" }],
    stakeBusiness: false,
    sacramentHymn: { number: 169, title: "In Remembrance of Thy Suffering" },
    speakers: [
      { name: "Sister Brown", topic: "Faith in Jesus Christ", type: "speaker" },
      { name: "Youth Choir", topic: "", type: "musical-number" },
      { name: "Brother Allen", topic: "Covenant Discipleship", type: "speaker" },
    ],
    closingHymn: { number: 31, title: "O God, Our Help in Ages Past" },
    closingPrayer: "Brother Davis",
  },
  {
    id: 2,
    date: "2026-07-19",
    meetingType: "testimony",
    presiding: "Bishop Smith",
    conducting: "Bishopric First Counselor",
    announcements: ["Stake conference next weekend"],
    openingHymn: { number: 19, title: "We Thank Thee, O God, for a Prophet" },
    openingPrayer: "Brother Carter",
    wardBusiness: [{ description: "Release of ward mission leader" }],
    stakeBusiness: false,
    sacramentHymn: { number: 174, title: "While of These Emblems We Partake" },
    speakers: [
      { name: "Ward Members", topic: "Testimonies", type: "speaker" },
      { name: "Ward Choir", topic: "", type: "musical-number" },
    ],
    closingHymn: { number: 85, title: "How Firm a Foundation" },
    closingPrayer: "Sister Morales",
  },
  {
    id: 3,
    date: "2026-07-26",
    meetingType: "stake",
    presiding: "Stake Presidency",
    conducting: "Stake Clerk",
    announcements: ["No second-hour meetings"],
    openingHymn: { number: 3, title: "Now Let Us Rejoice" },
    openingPrayer: "Assigned by stake presidency",
    wardBusiness: [],
    stakeBusiness: true,
    sacramentHymn: { number: 170, title: "God, Our Father, Hear Us Pray" },
    speakers: [{ name: "Stake Presidency", topic: "Stake Conference Messages", type: "speaker" }],
    closingHymn: { number: 134, title: "I Believe in Christ" },
    closingPrayer: "Assigned by stake presidency",
  },
  {
    id: 4,
    date: "2026-08-02",
    meetingType: "regular",
    presiding: "Bishop Smith",
    conducting: "Brother Jones",
    announcements: ["Youth camp parent meeting at 1:30 PM"],
    openingHymn: { number: 100, title: "Nearer, My God, to Thee" },
    openingPrayer: "Sister Anderson",
    wardBusiness: [{ description: "Calling of assistant ward clerk" }],
    stakeBusiness: false,
    sacramentHymn: { number: 172, title: "In Humility, Our Savior" },
    speakers: [
      { name: "Sister Lewis", topic: "Ministering with Joy", type: "speaker" },
      { name: "Brother Clark", topic: "Following the Spirit", type: "speaker" },
    ],
    closingHymn: { number: 219, title: "Because I Have Been Given Much" },
    closingPrayer: "Brother Hall",
  },
  {
    id: 5,
    date: "2026-08-09",
    meetingType: "general",
    presiding: "Bishop Smith",
    conducting: "Bishopric Second Counselor",
    announcements: ["Pioneer activity this Friday", "Ward mission fast next Sunday"],
    openingHymn: { number: 304, title: "Teach Me to Walk in the Light" },
    openingPrayer: "Sister Green",
    wardBusiness: [{ description: "Annual ward budget overview" }],
    stakeBusiness: false,
    sacramentHymn: { number: 175, title: "O God, the Eternal Father" },
    speakers: [
      { name: "Brother Young", topic: "Scripture Study in the Home", type: "speaker" },
      { name: "Primary Children", topic: "", type: "musical-number" },
    ],
    closingHymn: { number: 243, title: "Let Us All Press On" },
    closingPrayer: "Brother Kent",
  },
];

export function getMeetings(date?: string | null): SacramentMeeting[] {
  if (date) {
    return meetings.filter((meeting) => meeting.date === date);
  }

  return meetings;
}

export function getMeetingById(id: number): SacramentMeeting | null {
  return meetings.find((meeting) => meeting.id === id) ?? null;
}
