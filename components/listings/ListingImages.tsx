import Image from "next/image";
import { parseImageUrls } from "@/app/lib/upload";

interface ListingImagesProps {
  imageUrls: string | null;
  variant?: "card" | "detail";
}

export function ListingImages({ imageUrls, variant = "detail" }: ListingImagesProps) {
  const urls = parseImageUrls(imageUrls);
  if (urls.length === 0) return null;

  if (variant === "card") {
    return (
      <div className="relative mt-2 aspect-video w-full overflow-hidden rounded-lg bg-zinc-100 dark:bg-zinc-800">
        <Image
          src={urls[0]}
          alt="Listing"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 400px"
        />
      </div>
    );
  }

  return (
    <div className="mt-4 flex flex-wrap gap-2">
      {urls.map((url) => (
        <div
          key={url}
          className="relative aspect-video w-48 overflow-hidden rounded-lg bg-zinc-100 dark:bg-zinc-800"
        >
          <Image
            src={url}
            alt="Listing photo"
            fill
            className="object-cover"
            sizes="192px"
          />
        </div>
      ))}
    </div>
  );
}
