"use client";

import { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import axiosInstance from "@/libs/axios";
import { toast } from "react-hot-toast";

const AuthCallbackContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();

  useEffect(() => {
    const token = searchParams.get("token");

    if (!token) {
      toast.error("Authentication failed. Please try again.");
      router.push("/auth/signin");
      return;
    }

    // Store token so the axios request interceptor can attach it to /profile
    localStorage.setItem("auth_token", token);

    axiosInstance
      .get("/profile")
      .then((response) => {
        const user = response.data.data;
        login(token, user);
        toast.success("Successfully logged in with Google!");
        router.push("/profile");
      })
      .catch((error) => {
        console.error("Failed to fetch profile after Google login", error);
        localStorage.removeItem("auth_token");
        toast.error("Google login failed. Please try again.");
        router.push("/auth/signin");
      });
  }, [searchParams, login, router]);

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"></div>
    </div>
  );
};

const AuthCallback = () => {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen items-center justify-center">
          <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"></div>
        </div>
      }
    >
      <AuthCallbackContent />
    </Suspense>
  );
};

export default AuthCallback;
