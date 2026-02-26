"use client";

import { API_PATHS } from "@/constants";
import { apiRequest } from "@/lib/api-client";
import { clearToken } from "@/lib/token-storage";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => apiRequest(API_PATHS.LOGOUT, { method: "POST" }),
    onSuccess: () => {
      queryClient.clear();
    },
    onSettled: () => {
      clearToken();
    },
  });
}
