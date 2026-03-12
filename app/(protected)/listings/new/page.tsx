import Link from "next/link";
import { PostListingForm } from "@/components/listings/PostListingForm";

export default async function PostListingPage({
  searchParams,
}: {
  searchParams: Promise<{ tag?: string; returnTo?: string }>;
}) {
  const params = await searchParams;
  const defaultTag =
    params.tag === "sublet" || params.tag === "landlord" ? params.tag : "sublet";
  const returnTo = params.returnTo === "my-sublets" ? "my-sublets" : undefined;

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <Link
        href="/listings"
        className="mb-6 inline-block text-sm text-zinc-600 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200"
      >
        ← Back to listings
      </Link>
      <h1 className="text-2xl font-bold text-zinc-800 dark:text-zinc-100">
        Post a listing
      </h1>
      <p className="mt-2 text-zinc-600 dark:text-zinc-400">
        Add your sublet or landlord listing to the map.
      </p>
      <div className="mt-8">
        <PostListingForm defaultTag={defaultTag} returnTo={returnTo} />
      </div>
    </div>
  );
}
