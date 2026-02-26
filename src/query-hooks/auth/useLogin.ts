"use client";

import { API_PATHS } from "@/constants";
import { apiRequest } from "@/lib/api-client";
import { setToken } from "@/lib/token-storage";
import type { LoginRequestBody, LoginResponse } from "@/app/_types/auth-types";
import { useMutation } from "@tanstack/react-query";

function extractToken(data: LoginResponse | null): string | null {
  if (!data) return null;
  return data.token ?? data.accessToken ?? null;
}

export default function useLogin() {
  return useMutation({
    mutationFn: async (body: LoginRequestBody) => {
      const res = await apiRequest<LoginResponse>(API_PATHS.LOGIN, {
        method: "POST",
        body,
        skipAuth: true,
      });
      return res;
    },
    onSuccess: (data) => {
      const token = extractToken(data);
      if (token) setToken(token);
    },
  });
}
