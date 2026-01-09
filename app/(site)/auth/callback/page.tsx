"use client";

import { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import { toast } from "react-hot-toast";

const AuthCallbackContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();

  useEffect(() => {
    const token = searchParams.get("token");
    const userStr = searchParams.get("user");

    if (token && userStr) {
      try {
        const user = JSON.parse(userStr);
        login(token, user);
        toast.success("Successfully logged in with Google!");
        router.push("/");
      } catch (error) {
        console.error("Error parsing user data", error);
        toast.error("Failed to log in with Google.");
        router.push("/auth/signin");
      }
    }
  }, [searchParams, login, router]);

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"></div>
    </div>
  );
};

const AuthCallback = () => {
  return (
    <Suspense fallback={
      <div className="flex h-screen items-center justify-center">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"></div>
      </div>
    }>
      <AuthCallbackContent />
    </Suspense>
  );
};

export default AuthCallback;
