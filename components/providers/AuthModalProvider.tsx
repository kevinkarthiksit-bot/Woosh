"use client";

import { AuthModal } from "@/components/ui/AuthModal";
import { createContext, ReactNode, useCallback, useContext, useMemo, useState } from "react";

interface AuthModalContextValue {
  isOpen: boolean;
  redirectAfterLogin: string | null;
  openAuthModal: (redirectAfter?: string) => void;
  closeAuthModal: () => void;
}

const AuthModalContext = createContext<AuthModalContextValue | undefined>(undefined);

export function AuthModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [redirectAfterLogin, setRedirectAfterLogin] = useState<string | null>(null);

  const openAuthModal = useCallback((redirectAfter?: string) => {
    setRedirectAfterLogin(redirectAfter ?? null);
    setIsOpen(true);
  }, []);

  const closeAuthModal = useCallback(() => {
    setIsOpen(false);
    setRedirectAfterLogin(null);
  }, []);

  const value = useMemo(
    () => ({
      isOpen,
      redirectAfterLogin,
      openAuthModal,
      closeAuthModal,
    }),
    [isOpen, redirectAfterLogin, openAuthModal, closeAuthModal],
  );

  return (
    <AuthModalContext.Provider value={value}>
      {children}
      <AuthModal />
    </AuthModalContext.Provider>
  );
}

export function useAuthModal() {
  const context = useContext(AuthModalContext);
  if (!context) {
    throw new Error("useAuthModal must be used within AuthModalProvider");
  }
  return context;
}
