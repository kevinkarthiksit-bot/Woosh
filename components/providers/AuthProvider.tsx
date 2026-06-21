"use client";

import {
  clearAuth,
  getStoredToken,
  getStoredUser,
  persistAuth,
  requestOtp,
  verifyOtp,
} from "@/lib/api/auth";
import type { ApiUser } from "@/lib/api/types";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

interface AuthContextValue {
  user: ApiUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (token: string, user: ApiUser) => void;
  logout: () => void;
  sendOtp: (phone: string) => Promise<void>;
  confirmOtp: (phone: string, otp: string, name?: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<ApiUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setToken(getStoredToken());
    setUser(getStoredUser());
    setIsLoading(false);
  }, []);

  const login = useCallback((nextToken: string, nextUser: ApiUser) => {
    persistAuth(nextToken, nextUser);
    setToken(nextToken);
    setUser(nextUser);
  }, []);

  const logout = useCallback(() => {
    clearAuth();
    setToken(null);
    setUser(null);
  }, []);

  const sendOtp = useCallback(async (phone: string) => {
    await requestOtp(phone);
  }, []);

  const confirmOtp = useCallback(
    async (phone: string, otp: string, name?: string) => {
      const result = await verifyOtp(phone, otp, name);
      login(result.token, result.user);
    },
    [login],
  );

  const value = useMemo(
    () => ({
      user,
      token,
      isAuthenticated: Boolean(token && user),
      isLoading,
      login,
      logout,
      sendOtp,
      confirmOtp,
    }),
    [user, token, isLoading, login, logout, sendOtp, confirmOtp],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
