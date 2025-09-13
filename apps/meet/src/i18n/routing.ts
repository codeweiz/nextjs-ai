import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["zh", "en"],
  defaultLocale: "en",
  localeCookie: {
    name: "NEXT_LOCALE",
  },
  localeDetection: true,
  localePrefix: "as-needed",
});
