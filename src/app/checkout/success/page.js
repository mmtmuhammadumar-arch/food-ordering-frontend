"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { verifyPayment } from "@/lib/api";

function CheckoutSuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const { clearCart } = useCart();
  const [status, setStatus] = useState("checking");

  useEffect(() => {
    if (!sessionId) {
      setStatus("missing");
      return;
    }
    verifyPayment(sessionId)
      .then(() => {
        clearCart();
        setStatus("success");
      })
      .catch(() => setStatus("error"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionId]);

  return (
    <div className="mx-auto max-w-md px-6 py-20 text-center">
      {status === "checking" && <p className="text-muted">Confirming your payment&hellip;</p>}

      {status === "success" && (
        <>
          <h1 className="font-display text-2xl font-medium text-ink">Order placed!</h1>
          <p className="mt-2 text-muted">
            Thanks &mdash; your food is being prepared and is on its way.
          </p>
          <Link href="/orders" className="mt-6 inline-block text-ink underline">
            View my orders
          </Link>
        </>
      )}

      {(status === "error" || status === "missing") && (
        <>
          <h1 className="font-display text-2xl font-medium text-ink">
            Couldn&apos;t confirm payment
          </h1>
          <p className="mt-2 text-muted">
            If money was deducted, please check your orders page or contact support.
          </p>
          <Link href="/" className="mt-6 inline-block text-ink underline">
            Back to menu
          </Link>
        </>
      )}
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={<p className="mx-auto max-w-md px-6 py-20 text-center text-muted">Loading&hellip;</p>}>
      <CheckoutSuccessContent />
    </Suspense>
  );
}