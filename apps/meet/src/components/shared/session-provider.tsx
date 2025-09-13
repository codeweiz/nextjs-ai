"use client";

import { ReactNode } from "react";
import { useQueryClient } from "@tanstack/react-query";

// 会话提供者
export function SessionProvider({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient();

  return <div>{children}</div>;
}
