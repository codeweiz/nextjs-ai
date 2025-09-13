import { PropsWithChildren } from "react";
import { getLocale, getMessages } from "next-intl/server";
import { AppProviders } from "@microboat/meet/components/shared/providers";
import { NextIntlClientProvider } from "next-intl";

export default async function AppLayout({ children }: PropsWithChildren) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <AppProviders locale={locale}>
      <NextIntlClientProvider messages={messages}>
        {children}
      </NextIntlClientProvider>
    </AppProviders>
  );
}
