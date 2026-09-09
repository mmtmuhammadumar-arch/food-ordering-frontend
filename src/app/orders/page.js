"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { getOrders } from "@/lib/api";

export default function OrdersPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
      return;
    }
    if (user) {
      getOrders()
        .then((res) => setOrders(res.data.orders || res.data || []))
        .catch(() => setError("Couldn't load your orders."))
        .finally(() => setLoading(false));
    }
  }, [user, authLoading, router]);

  return (
    <div className="mx-auto max-w-2xl px-6 py-14">
      <h1 className="font-display text-2xl font-medium text-ink">My orders</h1>

      {loading && <p className="mt-6 text-muted">Loading&hellip;</p>}
      {error && <p className="mt-6 text-tomato">{error}</p>}

      {!loading && !error && orders.length === 0 && (
        <p className="mt-6 text-muted">You haven&apos;t placed any orders yet.</p>
      )}

      <div className="mt-6 space-y-4">
        {orders.map((order) => (
          <div key={order._id} className="rounded-xl border border-ink/10 p-4">
            <div className="flex items-center justify-between">
              <span className="font-display text-ink">Order #{order._id?.slice(-6)}</span>
              <span className="rounded-full bg-ink/5 px-3 py-1 text-xs capitalize text-ink/70">
                {order.status || "placed"}
              </span>
            </div>
            <p className="mt-1 text-sm text-muted">{order.address}</p>
            <p className="mt-2 font-display text-ink">Rs. {order.total}</p>

            {order.invoice?.hostedInvoiceUrl && (
              <div className="mt-3 border-t border-ink/10 pt-3">
                
                  <a href={order.invoice.hostedInvoiceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-ink underline hover:text-tomato"
                >
                  View Stripe invoice
                </a>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}