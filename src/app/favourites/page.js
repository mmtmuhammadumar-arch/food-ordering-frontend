"use client";

import Link from "next/link";
import Image from "next/image";
import { useFavourites } from "@/context/FavouritesContext";
import { useCart } from "@/context/CartContext";
import { getImageUrl } from "@/lib/api";

export default function FavouritesPage() {
  const { items, toggleFavourite } = useFavourites();
  const { addItem } = useCart();

  return (
    <div className="mx-auto max-w-2xl px-6 py-14">
      <h1 className="font-display text-2xl font-medium text-ink">Your favourites</h1>

      {items.length === 0 ? (
        <div className="mt-8">
          <p className="text-muted">You haven&apos;t saved any favourites yet.</p>
          <Link href="/" className="mt-4 inline-block text-ink underline">
            Browse the menu
          </Link>
        </div>
      ) : (
        <div className="mt-6">
          {items.map((item) => (
            <div
              key={item._id}
              className="flex items-center gap-4 border-b border-ink/10 py-5 last:border-none"
            >
              <Link
                href={`/product/${item._id}`}
                className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-ink/5"
              >
                {item.image ? (
                  <Image
                    src={getImageUrl(item.image)}
                    alt={item.name}
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                ) : null}
              </Link>

              <div className="flex-1">
                <Link href={`/product/${item._id}`}>
                  <h4 className="font-display text-base font-medium text-ink hover:underline">
                    {item.name}
                  </h4>
                </Link>
                <p className="text-sm text-muted">Rs. {item.price}</p>
              </div>

              <button
                onClick={() => addItem(item)}
                className="rounded-full border border-ink px-4 py-1.5 text-sm text-ink hover:bg-ink hover:text-paper"
              >
                Add to cart
              </button>

              <button
                onClick={() => toggleFavourite(item)}
                aria-label="Remove favourite"
                className="text-lg text-tomato"
              >
                ♥
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
