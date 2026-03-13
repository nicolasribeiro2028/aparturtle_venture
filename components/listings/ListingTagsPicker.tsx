"use client";

import { useState } from "react";

export const LISTING_AMENITY_TAGS = [
  { value: "quiet_place",          label: "Quiet place",          emoji: "🤫" },
  { value: "pet_friendly",         label: "Pet-friendly",         emoji: "🐾" },
  { value: "close_to_supermarket", label: "Near supermarket",     emoji: "🛒" },
  { value: "close_to_bus_stop",    label: "Near bus stop",        emoji: "🚌" },
  { value: "furnished",            label: "Furnished",            emoji: "🛋️" },
  { value: "utilities_included",   label: "Utilities included",   emoji: "💡" },
];

export function ListingTagsPicker({
  defaultTags = [],
}: {
  defaultTags?: string[];
}) {
  const [selected, setSelected] = useState<string[]>(defaultTags);

  const toggle = (value: string) =>
    setSelected((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );

  return (
    <div>
      <input type="hidden" name="amenity_tags" value={JSON.stringify(selected)} />
      <div className="flex flex-wrap gap-2">
        {LISTING_AMENITY_TAGS.map((tag) => {
          const active = selected.includes(tag.value);
          return (
            <button
              key={tag.value}
              type="button"
              onClick={() => toggle(tag.value)}
              className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium transition-colors ${
                active
                  ? "border-amber-400 bg-amber-50 text-amber-800"
                  : "border-zinc-200 bg-white text-zinc-500 hover:border-amber-300 hover:text-zinc-700 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:border-amber-500"
              }`}
            >
              <span>{tag.emoji}</span>
              {tag.label}
            </button>
          );
        })}
      </div>
      {selected.length === 0 && (
        <p className="mt-2 text-xs text-zinc-400">
          No tags selected — tap any to add them.
        </p>
      )}
    </div>
  );
}
