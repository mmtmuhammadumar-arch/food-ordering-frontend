"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import CartLineItem from "@/components/CartLineItem";

export default function CartPage() {
  const { items, total } = useCart();

  return (
    <div className="mx-auto max-w-2xl px-6 py-14">
      <h1 className="font-display text-2xl font-medium text-ink">Your cart</h1>

      {items.length === 0 ? (
        <div className="mt-8">
          <p className="text-muted">Your cart is empty.</p>
          <Link href="/" className="mt-4 inline-block text-ink underline">
            Browse the menu
          </Link>
        </div>
      ) : (
        <>
          <div className="mt-6">
            {items.map((item) => (
              <CartLineItem key={item._id} item={item} />
            ))}
          </div>

          <div className="mt-6 flex items-center justify-between border-t border-ink/10 pt-6">
            <span className="font-display text-lg text-ink">Total</span>
            <span className="font-display text-lg text-ink">Rs. {total}</span>
          </div>

          <Link
            href="/checkout"
            className="mt-6 block w-full rounded-full bg-ink py-3 text-center text-paper hover:bg-ink/90"
          >
            Proceed to checkout
          </Link>
        </>
      )}
    </div>
  );
}
