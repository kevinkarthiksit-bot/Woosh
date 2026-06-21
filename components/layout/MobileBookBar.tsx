"use client";

import { useAuth } from "@/components/providers/AuthProvider";
import { useAuthModal } from "@/components/providers/AuthModalProvider";
import { Button } from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function MobileBookBar() {
  const router = useRouter();
  const { openAuthModal } = useAuthModal();
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const contact = document.getElementById("contact");
    if (!contact) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0.15 },
    );
    observer.observe(contact);
    return () => observer.disconnect();
  }, []);

  const handleBook = () => {
    if (authLoading) return;
    const bookPath = "/services/car-wash-and-care/book";
    if (!isAuthenticated) {
      openAuthModal(bookPath);
      return;
    }
    router.push(bookPath);
  };

  if (!visible) return null;

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 border-t border-black/8 bg-white/95 px-4 py-3 pb-safe backdrop-blur-md lg:hidden"
      role="region"
      aria-label="Quick booking"
    >
      <Button
        onClick={handleBook}
        disabled={authLoading}
        className="w-full min-h-[48px] text-base"
      >
        {authLoading ? "Loading…" : "Book a Wash"}
      </Button>
    </div>
  );
}
