import { getRequestConfig } from "next-intl/server";
import { getUserLocale } from "@microboat/dashboard/i18n/locale-cookie";
import { routing } from "@microboat/dashboard/i18n/routing";
import { getMessagesForLocale } from "@microboat/dashboard/i18n/messages";

export default getRequestConfig(async ({ requestLocale }) => {
  let requested = await requestLocale;
  if (!requested) {
    requested = await getUserLocale();
  }

  // @ts-ignore
  if (!routing.locales.includes(requested)) {
    requested = routing.defaultLocale;
  }

  return {
    locale: requested,
    messages: await getMessagesForLocale(requested),
  };
});
