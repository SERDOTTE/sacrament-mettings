import { getMeetings } from "@/lib/meetings-db";

const ISO_DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const date = searchParams.get("date");
  const query = searchParams.get("query") ?? "";
  const pageParam = searchParams.get("page");

  if (date !== null) {
    if (!ISO_DATE_PATTERN.test(date)) {
      return Response.json(
        { error: "Invalid 'date' parameter. Use YYYY-MM-DD." },
        { status: 400 },
      );
    }

    const meetings = await getMeetings(date);
    return Response.json(meetings, { status: 200 });
  }

  if (pageParam !== null) {
    const page = Number(pageParam);

    if (!Number.isInteger(page) || page < 1) {
      return Response.json(
        { error: "Invalid 'page' parameter. Use a positive integer." },
        { status: 400 },
      );
    }

    const meetings = await getMeetings(query, page);
    return Response.json(meetings, { status: 200 });
  }

  const meetings = await getMeetings(query);

  return Response.json(meetings, { status: 200 });
}
