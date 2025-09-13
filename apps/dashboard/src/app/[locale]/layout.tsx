import { ReactNode } from "react";
import { hasLocale, Locale, NextIntlClientProvider } from "next-intl";
import { routing } from "@microboat/dashboard/i18n/routing";
import { notFound } from "next/navigation";
import { AppProviders } from "@microboat/dashboard/components/shared/providers";

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: ReactNode;
  params: Promise<{ locale: Locale }>;
}>) {
  const { locale } = await params;

  // 如果 路径参数的 locale 不在 routing.locales 中，返回 notFound 页面
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <AppProviders locale={locale}>
      <NextIntlClientProvider>{children}</NextIntlClientProvider>
    </AppProviders>
  );
}
