"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useFavourites } from "@/context/FavouritesContext";
import { getImageUrl } from "@/lib/api";

export default function MenuItem({ item }) {
  const { addItem } = useCart();
  const { isFavourite, toggleFavourite } = useFavourites();
  const favourited = isFavourite(item._id);

  return (
    <div className="flex items-start gap-4 border-b border-ink/10 py-6 last:border-none">
      <Link
        href={`/product/${item._id}`}
        className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-ink/5"
      >
        {item.image ? (
          <Image
            src={getImageUrl(item.image)}
            alt={item.name}
            fill
            sizes="80px"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-xs text-muted">
            No image
          </div>
        )}
      </Link>

      <div className="flex-1">
        <div className="flex items-baseline justify-between gap-4">
          <Link href={`/product/${item._id}`}>
            <h3 className="font-display text-lg font-medium text-ink hover:underline">
              {item.name}
            </h3>
          </Link>
          <span className="whitespace-nowrap font-display text-lg text-tomato">
            Rs. {item.price}
          </span>
        </div>
        {item.description && (
          <p className="mt-1 text-sm text-muted">{item.description}</p>
        )}
      </div>

      <button
        onClick={() => toggleFavourite(item)}
        aria-label="Toggle favourite"
        className={`self-center text-lg ${favourited ? "text-tomato" : "text-ink/30 hover:text-ink/60"}`}
      >
        {favourited ? "♥" : "♡"}
      </button>

      <button
        onClick={() => addItem(item)}
        className="self-center rounded-full border border-ink px-4 py-1.5 text-sm text-ink transition-colors hover:bg-ink hover:text-paper"
      >
        Add
      </button>
    </div>
  );
}
