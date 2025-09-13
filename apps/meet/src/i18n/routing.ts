import { defineRouting } from "next-intl/routing";
import "@microboat/meet/config";
import { getAppConfig } from "@microboat/common/config";

const appConfig = getAppConfig();

export const routing = defineRouting({
	locales: Object.keys(appConfig.i18n.locales),
	defaultLocale: appConfig.i18n.defaultLocale,
	localeCookie: {
		name: appConfig.i18n.localeCookieName,
	},
	localeDetection: appConfig.i18n.enabled,
	localePrefix: appConfig.i18n.enabled ? "as-needed" : "never",
});
