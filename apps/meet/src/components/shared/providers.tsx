import { PropsWithChildren } from "react";
import { ThemeProvider } from "next-themes";
import { ApiClientProvider } from "@microboat/meet/components/shared/api-client-provider";
import { SessionProvider } from "@microboat/meet/components/shared/session-provider";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function AppProviders({
  children,
  locale,
}: PropsWithChildren<{ locale: string }>) {
  return (
    <html lang={locale} suppressHydrationWarning>
      <head></head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-w-screen overflow-x-hidden`}
      >
        <ThemeProvider attribute="class" enableSystem disableTransitionOnChange>
          <ApiClientProvider>
            <SessionProvider>{children}</SessionProvider>
          </ApiClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
