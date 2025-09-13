"use client";

import { PropsWithChildren } from "react";
import {
  defaultShouldDehydrateQuery,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

// 创建一个带默认配置的 QueryClient
export function createQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // 30 秒内不主动重新请求
        staleTime: 30 * 1000,

        // 请求失败时不重试
        retry: false,
      },
      dehydrate: {
        // SSR/SSG 数据脱水配置，使用默认逻辑、或者 query 为 pending 状态时也脱水（保证未完成的请求在客户端继续运行）
        shouldDehydrateQuery: (query) =>
          defaultShouldDehydrateQuery(query) ||
          query.state.status === "pending",
      },
    },
  });
}

// QueryClient 实例，在服务端渲染时每次都要独立的 QueryClient，避免不同请求共享数据；在客户端希望整个应用只用一个 QueryClient 实例，避免缓存丢失、重复渲染
let clientQueryClientSingleton: QueryClient;

// 获取 QueryClient 实例
function getQueryClient() {
  if (typeof window === "undefined") {
    // 表示在服务端
    return createQueryClient();
  }

  // 在客户端时
  if (!clientQueryClientSingleton) {
    clientQueryClientSingleton = createQueryClient();
  }
  return clientQueryClientSingleton;
}

export function ApiClientProvider({ children }: PropsWithChildren) {
  // 拿到 QueryClient 实例，提供给所有子组件，子组件可以直接使用 React Query 的 useQuery、useMutation 等 Hook
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
