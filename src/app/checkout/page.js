"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { checkout } from "@/lib/api";

export default function CheckoutPage() {
  const { items, total } = useCart();
  const { user } = useAuth();
  const router = useRouter();
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCheckout = async (e) => {
    e.preventDefault();
    if (!user) {
      router.push("/login");
      return;
    }
    setError("");
    setLoading(true);
    try {
      // Sends the cart + delivery details to the backend, which creates the
      // Order and a Stripe Checkout Session. Adjust the payload shape below
      // to match exactly what your /api/orders/checkout route expects.
      const res = await checkout({
        items: items.map((i) => ({ productId: i._id, quantity: i.quantity })),
        address,
        phone,
      });

      // Backend is expected to return a Stripe-hosted checkout URL
      if (res.data.url) {
        window.location.href = res.data.url;
      } else {
        setError("Checkout started, but no payment link was returned.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Checkout failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-md px-6 py-16">
        <p className="text-muted">Your cart is empty, nothing to check out.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-md px-6 py-14">
      <h1 className="font-display text-2xl font-medium text-ink">Checkout</h1>

      <div className="mt-6 rounded-xl border border-ink/10 p-4">
        {items.map((item) => (
          <div key={item._id} className="flex justify-between text-sm py-1">
            <span>
              {item.name} &times; {item.quantity}
            </span>
            <span>Rs. {item.price * item.quantity}</span>
          </div>
        ))}
        <div className="mt-2 flex justify-between border-t border-ink/10 pt-2 font-medium">
          <span>Total</span>
          <span>Rs. {total}</span>
        </div>
      </div>

      <form onSubmit={handleCheckout} className="mt-6 space-y-4">
        <div>
          <label className="text-sm text-ink/80">Delivery address</label>
          <textarea
            required
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            rows={3}
            className="mt-1 w-full rounded-lg border border-ink/20 bg-transparent px-3 py-2 outline-none focus:border-ink"
          />
        </div>
        <div>
          <label className="text-sm text-ink/80">Phone number</label>
          <input
            type="tel"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="mt-1 w-full rounded-lg border border-ink/20 bg-transparent px-3 py-2 outline-none focus:border-ink"
          />
        </div>

        {error && <p className="text-sm text-tomato">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-full bg-ink py-3 text-paper hover:bg-ink/90 disabled:opacity-50"
        >
          {loading ? "Redirecting to payment..." : "Pay with Stripe"}
        </button>
      </form>
    </div>
  );
}
