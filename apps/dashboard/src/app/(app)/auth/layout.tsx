import { ReactNode } from "react";

// 鉴权布局
export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center gap-2 p-6">
        {children}
      </div>
      <div className="container max-w-4xl mx-auto pb-6"></div>
    </div>
  );
}
