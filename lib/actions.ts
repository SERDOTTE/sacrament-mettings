"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

import { addMeeting, deleteMeeting as deleteMeetingRecord, updateMeeting as updateMeetingRecord } from "@/lib/meetings-db";
import type { SacramentMeeting } from "@/lib/types";

export interface MeetingFormState {
  message: string;
  errors?: Record<string, string[]>;
}

const MeetingFormSchema = z.object({
  date: z.string().trim().regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format."),
  meetingType: z.enum(["testimony", "regular", "stake", "general"]),
  presiding: z.string().trim().min(2, "Presiding leader is required."),
  conducting: z.string().trim().min(2, "Conducting leader is required."),
  openingHymnNumber: z.coerce.number().int().positive("Opening hymn number must be positive."),
  openingHymnTitle: z.string().trim().min(2, "Opening hymn title is required."),
  openingPrayer: z.string().trim().min(2, "Opening prayer is required."),
  wardBusiness: z.string().trim().optional().default(""),
  stakeBusiness: z.boolean().default(false),
  sacramentHymnNumber: z.coerce.number().int().positive("Sacrament hymn number must be positive."),
  sacramentHymnTitle: z.string().trim().min(2, "Sacrament hymn title is required."),
  closingHymnNumber: z.coerce.number().int().positive("Closing hymn number must be positive."),
  closingHymnTitle: z.string().trim().min(2, "Closing hymn title is required."),
  closingPrayer: z.string().trim().min(2, "Closing prayer is required."),
  announcements: z.string().trim().optional().default(""),
});

function normalizeTextList(value: string): string[] {
  return value
    .split(/\n+/)
    .map((entry) => entry.trim())
    .filter(Boolean);
}

function parseFormData(formData: FormData) {
  return {
    date: String(formData.get("date") ?? "").trim(),
    meetingType: String(formData.get("meetingType") ?? ""),
    presiding: String(formData.get("presiding") ?? "").trim(),
    conducting: String(formData.get("conducting") ?? "").trim(),
    openingHymnNumber: formData.get("openingHymnNumber") ?? "",
    openingHymnTitle: String(formData.get("openingHymnTitle") ?? "").trim(),
    openingPrayer: String(formData.get("openingPrayer") ?? "").trim(),
    wardBusiness: String(formData.get("wardBusiness") ?? "").trim(),
    stakeBusiness: formData.get("stakeBusiness") === "on",
    sacramentHymnNumber: formData.get("sacramentHymnNumber") ?? "",
    sacramentHymnTitle: String(formData.get("sacramentHymnTitle") ?? "").trim(),
    closingHymnNumber: formData.get("closingHymnNumber") ?? "",
    closingHymnTitle: String(formData.get("closingHymnTitle") ?? "").trim(),
    closingPrayer: String(formData.get("closingPrayer") ?? "").trim(),
    announcements: String(formData.get("announcements") ?? "").trim(),
  };
}

function toMeetingPayload(parsedData: z.infer<typeof MeetingFormSchema>): Omit<SacramentMeeting, "id"> {
  return {
    date: parsedData.date,
    meetingType: parsedData.meetingType,
    presiding: parsedData.presiding,
    conducting: parsedData.conducting,
    announcements: normalizeTextList(parsedData.announcements),
    openingHymn: {
      number: parsedData.openingHymnNumber,
      title: parsedData.openingHymnTitle,
    },
    openingPrayer: parsedData.openingPrayer,
    wardBusiness: normalizeTextList(parsedData.wardBusiness).map((description) => ({ description })),
    stakeBusiness: parsedData.stakeBusiness,
    sacramentHymn: {
      number: parsedData.sacramentHymnNumber,
      title: parsedData.sacramentHymnTitle,
    },
    speakers: [],
    closingHymn: {
      number: parsedData.closingHymnNumber,
      title: parsedData.closingHymnTitle,
    },
    closingPrayer: parsedData.closingPrayer,
  };
}

export async function createMeeting(prevState: MeetingFormState, formData: FormData): Promise<MeetingFormState> {
  const parsedPayload = parseFormData(formData);
  const parsed = MeetingFormSchema.safeParse(parsedPayload);

  if (!parsed.success) {
    return {
      message: "Please correct the highlighted fields.",
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    await addMeeting(toMeetingPayload(parsed.data));
    revalidatePath("/meetings");
    redirect("/meetings");
  } catch (error) {
    console.error("Failed to create meeting:", error);
    return {
      message: "Unable to create the meeting right now.",
      errors: {},
    };
  }
}

export async function updateMeeting(
  id: number,
  prevState: MeetingFormState,
  formData: FormData,
): Promise<MeetingFormState> {
  const parsedPayload = parseFormData(formData);
  const parsed = MeetingFormSchema.safeParse(parsedPayload);

  if (!parsed.success) {
    return {
      message: "Please correct the highlighted fields.",
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    await updateMeetingRecord(id, toMeetingPayload(parsed.data));
    revalidatePath("/meetings");
    redirect("/meetings");
  } catch (error) {
    console.error("Failed to update meeting:", error);
    return {
      message: "Unable to update the meeting right now.",
      errors: {},
    };
  }
}

export async function deleteMeeting(formData: FormData): Promise<void> {
  const idValue = formData.get("id");
  const meetingId = Number(idValue);

  if (!Number.isInteger(meetingId)) {
    throw new Error("Invalid meeting id.");
  }

  try {
    await deleteMeetingRecord(meetingId);
    revalidatePath("/meetings");
    redirect("/meetings");
  } catch (error) {
    console.error("Failed to delete meeting:", error);
    throw new Error("Unable to delete the meeting right now.");
  }
}
