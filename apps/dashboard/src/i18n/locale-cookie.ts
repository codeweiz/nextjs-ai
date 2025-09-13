import "server-only";

import { cookies } from "next/headers";
import { Locale } from "next-intl";

// 获取用户语言
export async function getUserLocale() {
  const cookie = (await cookies()).get("NEXT_LOCALE");
  return cookie?.value ?? "zh";
}

// 设置语言到 cookie 中
export async function setLocaleCookie(locale: Locale) {
  (await cookies()).set("NEXT_LOCALE", locale);
}
