"use client";

import { useRouter } from "next/navigation";
import { Suspense, useEffect } from "react";

function OrdersRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/account?tab=orders");
  }, [router]);

  return <p className="section-padding pt-28 text-center text-muted">Redirecting to your account…</p>;
}

export default function OrdersPage() {
  return (
    <Suspense fallback={<p className="section-padding pt-28 text-center text-muted">Redirecting…</p>}>
      <OrdersRedirect />
    </Suspense>
  );
}
