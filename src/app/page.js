"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getMenuItems } from "@/lib/api";
import MenuItem from "@/components/MenuItem";
import { useFavourites } from "@/context/FavouritesContext";

export default function HomePage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { items: favourites } = useFavourites();

  useEffect(() => {
    getMenuItems()
      .then((res) => setItems(res.data.products || res.data || []))
      .catch(() => setError("Couldn't load the menu. Is the backend running?"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <section className="border-b border-ink/10 bg-ink text-paper">
        <div className="mx-auto max-w-5xl px-6 py-20">
          <p className="text-sm uppercase tracking-wide text-saffron">Now open</p>
          <h1 className="mt-3 max-w-xl font-display text-5xl font-semibold leading-tight">
            Hand-made food, delivered hot.
          </h1>
          <p className="mt-4 max-w-md text-paper/70">
            Browse today&apos;s menu below, add your favourites to the cart, and
            check out in a couple of taps.
          </p>
          {favourites.length > 0 && (
            <Link
              href="/favourites"
              className="mt-6 inline-block rounded-full border border-paper/30 px-4 py-1.5 text-sm text-paper hover:bg-paper/10"
            >
              View your {favourites.length} favourite{favourites.length > 1 ? "s" : ""} &rarr;
            </Link>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-14">
        <h2 className="font-display text-2xl font-medium text-ink">Today&apos;s menu</h2>

        {loading && <p className="mt-6 text-muted">Loading menu&hellip;</p>}
        {error && <p className="mt-6 text-tomato">{error}</p>}

        {!loading && !error && items.length === 0 && (
          <p className="mt-6 text-muted">
            No items yet &mdash; add some products from the backend to see them here.
          </p>
        )}

        <div className="mt-4">
          {items.map((item) => (
            <MenuItem key={item._id} item={item} />
          ))}
        </div>
      </section>
    </>
  );
}
