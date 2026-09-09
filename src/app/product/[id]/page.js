"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getMenuItem, getImageUrl } from "@/lib/api";
import { useCart } from "@/context/CartContext";
import { useFavourites } from "@/context/FavouritesContext";

export default function ProductDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { addItem } = useCart();
  const { isFavourite, toggleFavourite } = useFavourites();

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    getMenuItem(id)
      .then((res) => setItem(res.data.product || res.data))
      .catch(() => setError("Couldn't load this item."))
      .finally(() => setLoading(false));
  }, [id]);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) addItem(item);
    router.push("/cart");
  };

  if (loading) {
    return <p className="mx-auto max-w-2xl px-6 py-14 text-muted">Loading&hellip;</p>;
  }

  if (error || !item) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-14">
        <p className="text-tomato">{error || "Item not found."}</p>
        <Link href="/" className="mt-4 inline-block text-ink underline">
          Back to menu
        </Link>
      </div>
    );
  }

  const favourited = isFavourite(item._id);

  return (
    <div className="mx-auto max-w-2xl px-6 py-14">
      <Link href="/" className="text-sm text-muted hover:text-ink">
        &larr; Back to menu
      </Link>

      <div className="mt-6 grid gap-8 sm:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-xl bg-ink/5">
          {item.image ? (
            <Image
              src={getImageUrl(item.image)}
              alt={item.name}
              fill
              sizes="(min-width: 640px) 50vw, 100vw"
              className="object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-sm text-muted">
              No image
            </div>
          )}
        </div>

        <div>
          <div className="flex items-start justify-between gap-4">
            <h1 className="font-display text-2xl font-medium text-ink">{item.name}</h1>
            <button
              onClick={() => toggleFavourite(item)}
              aria-label="Toggle favourite"
              className={`text-2xl ${favourited ? "text-tomato" : "text-ink/30 hover:text-ink/60"}`}
            >
              {favourited ? "♥" : "♡"}
            </button>
          </div>

          <p className="mt-2 font-display text-xl text-tomato">Rs. {item.price}</p>

          {item.description && (
            <p className="mt-4 text-muted">{item.description}</p>
          )}

          <div className="mt-6 flex items-center gap-3">
            <span className="text-sm text-ink/80">Quantity</span>
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="h-8 w-8 rounded-full border border-ink/20 text-ink hover:border-ink"
            >
              −
            </button>
            <span className="w-6 text-center">{quantity}</span>
            <button
              onClick={() => setQuantity((q) => q + 1)}
              className="h-8 w-8 rounded-full border border-ink/20 text-ink hover:border-ink"
            >
              +
            </button>
          </div>

          <button
            onClick={handleAddToCart}
            className="mt-8 w-full rounded-full bg-ink py-3 text-paper hover:bg-ink/90"
          >
            Add to cart &mdash; Rs. {item.price * quantity}
          </button>
        </div>
      </div>
    </div>
  );
}
