"use client";

import { useActionState } from "react";
import Link from "next/link";

import { updateMeeting, type MeetingFormState } from "@/lib/actions";
import type { SacramentMeeting } from "@/lib/types";

const initialState: MeetingFormState = {
  message: "",
  errors: {},
};

interface MeetingEditFormProps {
  meeting: SacramentMeeting;
}

export default function MeetingEditForm({ meeting }: MeetingEditFormProps) {
  const [state, formAction, isPending] = useActionState(
    updateMeeting.bind(null, meeting.id),
    initialState,
  );

  return (
    <form action={formAction} className="space-y-6 rounded-2xl border border-amber-200 bg-white p-6 shadow-sm">
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label htmlFor="date" className="mb-1 block text-sm font-medium text-stone-700">
            Date
          </label>
          <input
            id="date"
            name="date"
            type="date"
            defaultValue={meeting.date}
            required
            className="w-full rounded-md border border-stone-300 px-3 py-2"
            aria-describedby="date-error"
          />
          <div id="date-error" aria-live="polite" className="mt-1 text-sm text-red-600">
            {state.errors?.date?.[0]}
          </div>
        </div>

        <div>
          <label htmlFor="meetingType" className="mb-1 block text-sm font-medium text-stone-700">
            Meeting Type
          </label>
          <select
            id="meetingType"
            name="meetingType"
            defaultValue={meeting.meetingType}
            className="w-full rounded-md border border-stone-300 px-3 py-2"
            aria-describedby="meetingType-error"
          >
            <option value="regular">Regular</option>
            <option value="testimony">Testimony</option>
            <option value="stake">Stake</option>
            <option value="general">General</option>
          </select>
          <div id="meetingType-error" aria-live="polite" className="mt-1 text-sm text-red-600">
            {state.errors?.meetingType?.[0]}
          </div>
        </div>

        <div>
          <label htmlFor="presiding" className="mb-1 block text-sm font-medium text-stone-700">
            Presiding
          </label>
          <input
            id="presiding"
            name="presiding"
            type="text"
            defaultValue={meeting.presiding}
            className="w-full rounded-md border border-stone-300 px-3 py-2"
            aria-describedby="presiding-error"
          />
          <div id="presiding-error" aria-live="polite" className="mt-1 text-sm text-red-600">
            {state.errors?.presiding?.[0]}
          </div>
        </div>

        <div>
          <label htmlFor="conducting" className="mb-1 block text-sm font-medium text-stone-700">
            Conducting
          </label>
          <input
            id="conducting"
            name="conducting"
            type="text"
            defaultValue={meeting.conducting}
            className="w-full rounded-md border border-stone-300 px-3 py-2"
            aria-describedby="conducting-error"
          />
          <div id="conducting-error" aria-live="polite" className="mt-1 text-sm text-red-600">
            {state.errors?.conducting?.[0]}
          </div>
        </div>

        <div>
          <label htmlFor="openingHymnNumber" className="mb-1 block text-sm font-medium text-stone-700">
            Opening Hymn Number
          </label>
          <input
            id="openingHymnNumber"
            name="openingHymnNumber"
            type="number"
            defaultValue={meeting.openingHymn.number}
            className="w-full rounded-md border border-stone-300 px-3 py-2"
            aria-describedby="openingHymnNumber-error"
          />
          <div id="openingHymnNumber-error" aria-live="polite" className="mt-1 text-sm text-red-600">
            {state.errors?.openingHymnNumber?.[0]}
          </div>
        </div>

        <div>
          <label htmlFor="openingHymnTitle" className="mb-1 block text-sm font-medium text-stone-700">
            Opening Hymn Title
          </label>
          <input
            id="openingHymnTitle"
            name="openingHymnTitle"
            type="text"
            defaultValue={meeting.openingHymn.title}
            className="w-full rounded-md border border-stone-300 px-3 py-2"
            aria-describedby="openingHymnTitle-error"
          />
          <div id="openingHymnTitle-error" aria-live="polite" className="mt-1 text-sm text-red-600">
            {state.errors?.openingHymnTitle?.[0]}
          </div>
        </div>

        <div>
          <label htmlFor="openingPrayer" className="mb-1 block text-sm font-medium text-stone-700">
            Opening Prayer
          </label>
          <input
            id="openingPrayer"
            name="openingPrayer"
            type="text"
            defaultValue={meeting.openingPrayer}
            className="w-full rounded-md border border-stone-300 px-3 py-2"
            aria-describedby="openingPrayer-error"
          />
          <div id="openingPrayer-error" aria-live="polite" className="mt-1 text-sm text-red-600">
            {state.errors?.openingPrayer?.[0]}
          </div>
        </div>

        <div>
          <label htmlFor="sacramentHymnNumber" className="mb-1 block text-sm font-medium text-stone-700">
            Sacrament Hymn Number
          </label>
          <input
            id="sacramentHymnNumber"
            name="sacramentHymnNumber"
            type="number"
            defaultValue={meeting.sacramentHymn.number}
            className="w-full rounded-md border border-stone-300 px-3 py-2"
            aria-describedby="sacramentHymnNumber-error"
          />
          <div id="sacramentHymnNumber-error" aria-live="polite" className="mt-1 text-sm text-red-600">
            {state.errors?.sacramentHymnNumber?.[0]}
          </div>
        </div>

        <div>
          <label htmlFor="sacramentHymnTitle" className="mb-1 block text-sm font-medium text-stone-700">
            Sacrament Hymn Title
          </label>
          <input
            id="sacramentHymnTitle"
            name="sacramentHymnTitle"
            type="text"
            defaultValue={meeting.sacramentHymn.title}
            className="w-full rounded-md border border-stone-300 px-3 py-2"
            aria-describedby="sacramentHymnTitle-error"
          />
          <div id="sacramentHymnTitle-error" aria-live="polite" className="mt-1 text-sm text-red-600">
            {state.errors?.sacramentHymnTitle?.[0]}
          </div>
        </div>

        <div>
          <label htmlFor="closingHymnNumber" className="mb-1 block text-sm font-medium text-stone-700">
            Closing Hymn Number
          </label>
          <input
            id="closingHymnNumber"
            name="closingHymnNumber"
            type="number"
            defaultValue={meeting.closingHymn.number}
            className="w-full rounded-md border border-stone-300 px-3 py-2"
            aria-describedby="closingHymnNumber-error"
          />
          <div id="closingHymnNumber-error" aria-live="polite" className="mt-1 text-sm text-red-600">
            {state.errors?.closingHymnNumber?.[0]}
          </div>
        </div>

        <div>
          <label htmlFor="closingHymnTitle" className="mb-1 block text-sm font-medium text-stone-700">
            Closing Hymn Title
          </label>
          <input
            id="closingHymnTitle"
            name="closingHymnTitle"
            type="text"
            defaultValue={meeting.closingHymn.title}
            className="w-full rounded-md border border-stone-300 px-3 py-2"
            aria-describedby="closingHymnTitle-error"
          />
          <div id="closingHymnTitle-error" aria-live="polite" className="mt-1 text-sm text-red-600">
            {state.errors?.closingHymnTitle?.[0]}
          </div>
        </div>

        <div>
          <label htmlFor="closingPrayer" className="mb-1 block text-sm font-medium text-stone-700">
            Closing Prayer
          </label>
          <input
            id="closingPrayer"
            name="closingPrayer"
            type="text"
            defaultValue={meeting.closingPrayer}
            className="w-full rounded-md border border-stone-300 px-3 py-2"
            aria-describedby="closingPrayer-error"
          />
          <div id="closingPrayer-error" aria-live="polite" className="mt-1 text-sm text-red-600">
            {state.errors?.closingPrayer?.[0]}
          </div>
        </div>

        <div className="md:col-span-2">
          <label htmlFor="wardBusiness" className="mb-1 block text-sm font-medium text-stone-700">
            Ward Business
          </label>
          <textarea
            id="wardBusiness"
            name="wardBusiness"
            rows={3}
            defaultValue={meeting.wardBusiness.map((item) => item.description).join("\n")}
            className="w-full rounded-md border border-stone-300 px-3 py-2"
            aria-describedby="wardBusiness-error"
          />
          <div id="wardBusiness-error" aria-live="polite" className="mt-1 text-sm text-red-600">
            {state.errors?.wardBusiness?.[0]}
          </div>
        </div>

        <div className="md:col-span-2">
          <label htmlFor="announcements" className="mb-1 block text-sm font-medium text-stone-700">
            Announcements
          </label>
          <textarea
            id="announcements"
            name="announcements"
            rows={3}
            defaultValue={(meeting.announcements ?? []).join("\n")}
            className="w-full rounded-md border border-stone-300 px-3 py-2"
            aria-describedby="announcements-error"
          />
          <div id="announcements-error" aria-live="polite" className="mt-1 text-sm text-red-600">
            {state.errors?.announcements?.[0]}
          </div>
        </div>

        <div className="md:col-span-2 flex items-center gap-3">
          <input
            id="stakeBusiness"
            name="stakeBusiness"
            type="checkbox"
            defaultChecked={meeting.stakeBusiness}
            className="h-4 w-4"
          />
          <label htmlFor="stakeBusiness" className="text-sm font-medium text-stone-700">
            Stake Business
          </label>
        </div>
      </div>

      {state.message ? <p className="text-sm text-stone-700">{state.message}</p> : null}

      <div className="flex gap-3">
        <button type="submit" disabled={isPending} className="rounded-md bg-stone-900 px-4 py-2 text-sm font-semibold text-white">
          {isPending ? "Saving..." : "Save Changes"}
        </button>
        <Link href="/meetings" className="rounded-md border border-stone-300 px-4 py-2 text-sm font-semibold text-stone-900">
          Cancel
        </Link>
      </div>
    </form>
  );
}
