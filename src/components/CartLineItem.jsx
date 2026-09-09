"use client";

import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { getImageUrl } from "@/lib/api";

export default function CartLineItem({ item }) {
  const { updateQuantity, removeItem } = useCart();

  return (
    <div className="flex items-center gap-4 border-b border-ink/10 py-5 last:border-none">
      <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-ink/5">
        {item.image ? (
          <Image
            src={getImageUrl(item.image)}
            alt={item.name}
            fill
            sizes="64px"
            className="object-cover"
          />
        ) : null}
      </div>

      <div className="flex-1">
        <h4 className="font-display text-base font-medium text-ink">{item.name}</h4>
        <p className="text-sm text-muted">Rs. {item.price}</p>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => updateQuantity(item._id, item.quantity - 1)}
          className="h-7 w-7 rounded-full border border-ink/20 text-ink hover:border-ink"
        >
          −
        </button>
        <span className="w-6 text-center text-sm">{item.quantity}</span>
        <button
          onClick={() => updateQuantity(item._id, item.quantity + 1)}
          className="h-7 w-7 rounded-full border border-ink/20 text-ink hover:border-ink"
        >
          +
        </button>
      </div>

      <p className="w-20 text-right font-display text-ink">
        Rs. {item.price * item.quantity}
      </p>

      <button
        onClick={() => removeItem(item._id)}
        className="text-sm text-muted hover:text-tomato"
      >
        Remove
      </button>
    </div>
  );
}
