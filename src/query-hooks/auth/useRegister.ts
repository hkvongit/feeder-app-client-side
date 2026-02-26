"use client";

import { API_PATHS } from "@/constants";
import { apiRequest } from "@/lib/api-client";
import type { RegisterRequestBody } from "@/app/_types/auth-types";
import { useMutation } from "@tanstack/react-query";

export default function useRegister() {
  return useMutation({
    mutationFn: (body: RegisterRequestBody) =>
      apiRequest(API_PATHS.REGISTER, {
        method: "POST",
        body,
        skipAuth: true,
      }),
  });
}
