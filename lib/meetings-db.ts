import { neon } from "@neondatabase/serverless";
import type { SacramentMeeting } from "@/lib/types";

const connectionString = process.env.DATABASE_URL;
const sql = connectionString ? neon(connectionString) : null;

const ITEMS_PER_PAGE = 6;
const ISO_DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

export async function getMeetings(
  queryOrDate: string | null = "",
  currentPage?: number,
): Promise<SacramentMeeting[]> {
  if (!sql) {
    return [];
  }

  const normalized = queryOrDate ?? "";

  if (normalized && ISO_DATE_PATTERN.test(normalized)) {
    const rows = await sql`
      SELECT
        id,
        to_char(date, 'YYYY-MM-DD') AS "date",
        meeting_type                AS "meetingType",
        presiding, conducting, announcements,
        opening_hymn                AS "openingHymn",
        opening_prayer              AS "openingPrayer",
        ward_business               AS "wardBusiness",
        stake_business              AS "stakeBusiness",
        sacrament_hymn              AS "sacramentHymn",
        speakers,
        closing_hymn                AS "closingHymn",
        closing_prayer              AS "closingPrayer"
      FROM meetings
      WHERE date = ${normalized}::date
      ORDER BY date DESC
    `;

    return rows as unknown as SacramentMeeting[];
  }

  if (normalized === "" && currentPage === undefined) {
    const rows = await sql`
      SELECT
        id,
        to_char(date, 'YYYY-MM-DD') AS "date",
        meeting_type                AS "meetingType",
        presiding, conducting, announcements,
        opening_hymn                AS "openingHymn",
        opening_prayer              AS "openingPrayer",
        ward_business               AS "wardBusiness",
        stake_business              AS "stakeBusiness",
        sacrament_hymn              AS "sacramentHymn",
        speakers,
        closing_hymn                AS "closingHymn",
        closing_prayer              AS "closingPrayer"
      FROM meetings
      ORDER BY date DESC
    `;

    return rows as unknown as SacramentMeeting[];
  }

  const searchTerm = `%${normalized}%`;
  const page = currentPage ?? 1;
  const offset = (page - 1) * ITEMS_PER_PAGE;

  const rows = await sql`
    SELECT
      id,
      to_char(date, 'YYYY-MM-DD') AS "date",
      meeting_type                AS "meetingType",
      presiding, conducting, announcements,
      opening_hymn                AS "openingHymn",
      opening_prayer              AS "openingPrayer",
      ward_business               AS "wardBusiness",
      stake_business              AS "stakeBusiness",
      sacrament_hymn              AS "sacramentHymn",
      speakers,
      closing_hymn                AS "closingHymn",
      closing_prayer              AS "closingPrayer"
    FROM meetings
    WHERE
      presiding ILIKE ${searchTerm}
      OR conducting ILIKE ${searchTerm}
      OR meeting_type ILIKE ${searchTerm}
      OR speakers::text ILIKE ${searchTerm}
    ORDER BY date DESC
    LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
  `;

  return rows as unknown as SacramentMeeting[];
}

export async function getMeetingsTotalPages(query: string = ""): Promise<number> {
  if (!sql) {
    return 0;
  }

  const searchTerm = `%${query}%`;
  const rows = await sql`
    SELECT COUNT(*)
    FROM meetings
    WHERE
      presiding ILIKE ${searchTerm}
      OR conducting ILIKE ${searchTerm}
      OR meeting_type ILIKE ${searchTerm}
      OR speakers::text ILIKE ${searchTerm}
  `;

  return Math.ceil(Number(rows[0].count) / ITEMS_PER_PAGE);
}

export async function getMeetingById(id: number): Promise<SacramentMeeting | null> {
  if (!sql) {
    return null;
  }

  const rows = await sql`
    SELECT
      id,
      to_char(date, 'YYYY-MM-DD') AS "date",
      meeting_type                AS "meetingType",
      presiding, conducting, announcements,
      opening_hymn                AS "openingHymn",
      opening_prayer              AS "openingPrayer",
      ward_business               AS "wardBusiness",
      stake_business              AS "stakeBusiness",
      sacrament_hymn              AS "sacramentHymn",
      speakers,
      closing_hymn                AS "closingHymn",
      closing_prayer              AS "closingPrayer"
    FROM meetings
    WHERE id = ${id}
  `;

  return (rows[0] as unknown as SacramentMeeting) ?? null;
}

function assertDatabaseConnection() {
  if (!sql) {
    throw new Error("DATABASE_URL is not configured.");
  }
}

export async function addMeeting(data: Omit<SacramentMeeting, "id">): Promise<SacramentMeeting> {
  assertDatabaseConnection();

  const rows = await sql!`
    INSERT INTO meetings (
      date,
      meeting_type,
      presiding,
      conducting,
      announcements,
      opening_hymn,
      opening_prayer,
      ward_business,
      stake_business,
      sacrament_hymn,
      speakers,
      closing_hymn,
      closing_prayer
    ) VALUES (
      ${data.date}::date,
      ${data.meetingType},
      ${data.presiding},
      ${data.conducting},
      ${data.announcements ?? []}::text[],
      ${JSON.stringify(data.openingHymn)}::jsonb,
      ${data.openingPrayer},
      ${JSON.stringify(data.wardBusiness)}::jsonb,
      ${data.stakeBusiness},
      ${JSON.stringify(data.sacramentHymn)}::jsonb,
      ${JSON.stringify(data.speakers ?? [])}::jsonb,
      ${JSON.stringify(data.closingHymn)}::jsonb,
      ${data.closingPrayer}
    )
    RETURNING
      id,
      to_char(date, 'YYYY-MM-DD') AS "date",
      meeting_type                AS "meetingType",
      presiding, conducting, announcements,
      opening_hymn                AS "openingHymn",
      opening_prayer              AS "openingPrayer",
      ward_business               AS "wardBusiness",
      stake_business              AS "stakeBusiness",
      sacrament_hymn              AS "sacramentHymn",
      speakers,
      closing_hymn                AS "closingHymn",
      closing_prayer              AS "closingPrayer"
  `;

  return rows[0] as unknown as SacramentMeeting;
}

export async function updateMeeting(
  id: number,
  updates: Partial<SacramentMeeting>,
): Promise<SacramentMeeting | null> {
  assertDatabaseConnection();

  const rows = await sql!`
    UPDATE meetings
    SET
      date = ${updates.date}::date,
      meeting_type = ${updates.meetingType},
      presiding = ${updates.presiding},
      conducting = ${updates.conducting},
      announcements = ${updates.announcements ?? []}::text[],
      opening_hymn = ${JSON.stringify(updates.openingHymn)}::jsonb,
      opening_prayer = ${updates.openingPrayer},
      ward_business = ${JSON.stringify(updates.wardBusiness ?? [])}::jsonb,
      stake_business = ${Boolean(updates.stakeBusiness)},
      sacrament_hymn = ${JSON.stringify(updates.sacramentHymn)}::jsonb,
      speakers = ${JSON.stringify(updates.speakers ?? [])}::jsonb,
      closing_hymn = ${JSON.stringify(updates.closingHymn)}::jsonb,
      closing_prayer = ${updates.closingPrayer}
    WHERE id = ${id}
    RETURNING
      id,
      to_char(date, 'YYYY-MM-DD') AS "date",
      meeting_type                AS "meetingType",
      presiding, conducting, announcements,
      opening_hymn                AS "openingHymn",
      opening_prayer              AS "openingPrayer",
      ward_business               AS "wardBusiness",
      stake_business              AS "stakeBusiness",
      sacrament_hymn              AS "sacramentHymn",
      speakers,
      closing_hymn                AS "closingHymn",
      closing_prayer              AS "closingPrayer"
  `;

  return (rows[0] as unknown as SacramentMeeting) ?? null;
}

export async function deleteMeeting(id: number): Promise<boolean> {
  assertDatabaseConnection();

  const rows = await sql!`
    DELETE FROM meetings
    WHERE id = ${id}
    RETURNING id
  `;

  return rows.length > 0;
}
