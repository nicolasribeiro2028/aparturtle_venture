"use client";

import { useState } from "react";
import { useActionState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";

const PinPicker = dynamic(
  () => import("@/components/map/PinPicker").then((m) => m.PinPicker),
  { ssr: false, loading: () => <div className="h-64 animate-pulse rounded-lg bg-zinc-100 dark:bg-zinc-800" /> }
);
import { ListingTagsPicker } from "@/components/listings/ListingTagsPicker";
import { updateListingAction } from "@/app/actions/listings";

const initialState = { error: "" as string | undefined };

interface EditListingFormProps {
  listingId: string;
  initialData: {
    tag: string;
    term: string;
    title: string;
    description: string | null;
    price: string | null;
    startDate: string | null;
    endDate: string | null;
    pinX: number;
    pinY: number;
    imageUrls: string | null;
    amenityTags: string | null;
  };
}

export function EditListingForm({ listingId, initialData }: EditListingFormProps) {
  const [state, formAction] = useActionState(
    async (_prev: typeof initialState, formData: FormData) => {
      return updateListingAction(listingId, formData);
    },
    initialState
  );

  const [pinX, setPinX] = useState(initialData.pinX);
  const [pinY, setPinY] = useState(initialData.pinY);

  const defaultTags: string[] = (() => {
    try {
      return initialData.amenityTags ? JSON.parse(initialData.amenityTags) : [];
    } catch {
      return [];
    }
  })();

  return (
    <form action={formAction} className="space-y-6">
      <input type="hidden" name="pinX" value={pinX} />
      <input type="hidden" name="pinY" value={pinY} />
      {state?.error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700 dark:border-red-800 dark:bg-red-950/50 dark:text-red-400">
          {state.error}
        </div>
      )}

      <div>
        <label className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Type
        </label>
        <div className="flex gap-4">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="tag"
              value="sublet"
              defaultChecked={initialData.tag === "sublet"}
            />
            <span>Sublet</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="tag"
              value="landlord"
              defaultChecked={initialData.tag === "landlord"}
            />
            <span>Landlord</span>
          </label>
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Term
        </label>
        <div className="flex gap-4">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="term"
              value="summer"
              defaultChecked={initialData.term === "summer"}
            />
            <span>Summer</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="term"
              value="year_long"
              defaultChecked={initialData.term === "year_long"}
            />
            <span>Year-long</span>
          </label>
        </div>
      </div>

      <div>
        <label
          htmlFor="title"
          className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300"
        >
          Title *
        </label>
        <input
          id="title"
          name="title"
          type="text"
          required
          defaultValue={initialData.title}
          className="w-full rounded-lg border border-zinc-300 px-3 py-2 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-100"
        />
      </div>

      <div>
        <label
          htmlFor="description"
          className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300"
        >
          Description
        </label>
        <textarea
          id="description"
          name="description"
          rows={4}
          defaultValue={initialData.description ?? ""}
          className="w-full rounded-lg border border-zinc-300 px-3 py-2 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-100"
        />
      </div>

      <div>
        <label
          htmlFor="price"
          className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300"
        >
          Price ($/month)
        </label>
        <input
          id="price"
          name="price"
          type="text"
          defaultValue={initialData.price ?? ""}
          className="w-full rounded-lg border border-zinc-300 px-3 py-2 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-100"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="startDate"
            className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300"
          >
            Start date
          </label>
          <input
            id="startDate"
            name="startDate"
            type="date"
            defaultValue={initialData.startDate ?? ""}
            className="w-full rounded-lg border border-zinc-300 px-3 py-2 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-100"
          />
        </div>
        <div>
          <label
            htmlFor="endDate"
            className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300"
          >
            End date
          </label>
          <input
            id="endDate"
            name="endDate"
            type="date"
            defaultValue={initialData.endDate ?? ""}
            className="w-full rounded-lg border border-zinc-300 px-3 py-2 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-100"
          />
        </div>
      </div>

      <div>
        <label htmlFor="images" className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Add more photos (optional, max 5 total)
        </label>
        <input
          id="images"
          name="images"
          type="file"
          accept="image/jpeg,image/png,image/webp"
          multiple
          className="w-full rounded-lg border border-zinc-300 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-100"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Property tags{" "}
          <span className="font-normal text-zinc-400">(optional)</span>
        </label>
        <p className="mb-2 text-xs text-zinc-400">
          Tag features that match student preferences — helps with future recommendations.
        </p>
        <ListingTagsPicker defaultTags={defaultTags} />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Location on map
        </label>
        <PinPicker
          pinX={pinX}
          pinY={pinY}
          onSelect={(x, y) => {
            setPinX(x);
            setPinY(y);
          }}
        />
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          className="rounded-lg bg-amber-500 px-6 py-2 font-semibold text-white hover:bg-amber-600"
        >
          Save changes
        </button>
        <Link
          href={`/listings/${listingId}`}
          className="rounded-lg border border-zinc-300 px-6 py-2 font-medium text-zinc-700 hover:bg-zinc-50 dark:border-zinc-600 dark:text-zinc-300 dark:hover:bg-zinc-800"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
