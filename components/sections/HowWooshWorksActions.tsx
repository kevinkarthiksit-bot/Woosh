"use client";

import { useAuth } from "@/components/providers/AuthProvider";
import { useAuthModal } from "@/components/providers/AuthModalProvider";
import { Button } from "@/components/ui/Button";
import { scrollToSection } from "@/lib/utils";
import { useRouter } from "next/navigation";

export function HowWooshWorksActions() {
  const router = useRouter();
  const { openAuthModal } = useAuthModal();
  const { isAuthenticated, isLoading: authLoading } = useAuth();

  const handleBook = () => {
    if (authLoading) return;
    const bookPath = "/services/car-wash-and-care/book";
    if (!isAuthenticated) {
      openAuthModal(bookPath);
      return;
    }
    router.push(bookPath);
  };

  return (
    <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
      <Button onClick={handleBook} disabled={authLoading}>
        Book doorstep wash
      </Button>
      <Button variant="secondary" onClick={() => scrollToSection("#services")}>
        See services and pricing
      </Button>
    </div>
  );
}
