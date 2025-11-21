// app/context/AuthContext.tsx (Updated)
"use client";
import React, { createContext, useContext, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  useCurrentUser,
  useLogin,
  useLogout,
  useRegister,
  useGoogleSignIn,
} from "@/app/(main)/lib/hooks/useAuth";
import { User } from "@/app/(main)/lib/services/firebase-auth-services";
import {
  LoginFormData,
  RegisterFormData,
} from "@/app/(main)/lib/validations/auth";
import { useAuthRoute } from "./AuthRouteContext";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (data: LoginFormData) => Promise<void>;
  register: (data: RegisterFormData) => Promise<void>;
  logout: () => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  authActionLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const {
    data: user,
    isLoading: userLoading,
    error: userError,
  } = useCurrentUser();
  const { intendedRoute, clearIntendedRoute } = useAuthRoute();

  const loginMutation = useLogin();
  const registerMutation = useRegister();
  const logoutMutation = useLogout();
  const googleSignInMutation = useGoogleSignIn();

  // Track if any auth action is in progress
  const authActionLoading =
    loginMutation.isPending ||
    registerMutation.isPending ||
    googleSignInMutation.isPending;

  // Handle user loading errors (like offline errors)
  useEffect(() => {
    if (userError) {
      console.warn("User loading error (might be offline):", userError);
      // Don't show toast for offline errors to avoid annoying users
    }
  }, [userError]);

  // Handle successful authentication
  useEffect(() => {
    if (user && !userLoading && !authActionLoading) {
      // Redirect to intended route or dashboard
      const redirectPath = intendedRoute || "/";
      clearIntendedRoute();

      // Use setTimeout to ensure toast is visible before redirect
      setTimeout(() => {
        router.push(redirectPath);
      }, 1000);
    }
  }, [
    user,
    userLoading,
    authActionLoading,
    intendedRoute,
    clearIntendedRoute,
    router,
  ]);

  // Handle registration success
  useEffect(() => {
    if (registerMutation.isSuccess && !registerMutation.isPending) {
      // Clear any previous errors and redirect to login
      setTimeout(() => {
        router.push("/login");
      }, 1500);
    }
  }, [registerMutation.isSuccess, registerMutation.isPending, router]);

  // Handle errors
  useEffect(() => {
    if (loginMutation.error) {
    }

    if (registerMutation.error) {
    }

    if (googleSignInMutation.error) {
    }
  }, [loginMutation.error, registerMutation.error, googleSignInMutation.error]);

  const login = async (data: LoginFormData) => {
    try {
      await loginMutation.mutateAsync(data);
    } catch (error) {
      // Error handled in useEffect
    }
  };

  const register = async (data: RegisterFormData) => {
    try {
      await registerMutation.mutateAsync({
        name: data.name,
        email: data.email,
        password: data.password,
      });
    } catch (error) {
      // Error handled in useEffect
    }
  };

  const logout = async () => {
    try {
      await logoutMutation.mutateAsync();
    } catch (error: any) {}
  };

  const signInWithGoogle = async () => {
    try {
      await googleSignInMutation.mutateAsync();
    } catch (error) {
      // Error handled in useEffect
    }
  };

  const value: AuthContextType = {
    user: user || null,
    isLoading: userLoading,
    isAuthenticated: !!user && !userLoading,
    login,
    register,
    logout,
    signInWithGoogle,
    authActionLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
