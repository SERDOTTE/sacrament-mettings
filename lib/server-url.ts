import { headers } from "next/headers";

export async function getBaseUrl(): Promise<string> {
  const headerStore = await headers();
  const protocol = headerStore.get("x-forwarded-proto") ?? "http";
  const host = headerStore.get("x-forwarded-host") ?? headerStore.get("host") ?? "localhost:3000";

  return `${protocol}://${host}`;
}
