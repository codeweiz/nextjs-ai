import { Locale, Messages } from "next-intl";
import { routing } from "@microboat/meet/i18n/routing";
import deepmerge from "deepmerge";

// 导入 messages 目录下的国际化配置文件
const importLocale = async (locale: Locale): Promise<Messages> => {
  return (await import(`../../messages/${locale}.json`)).default as Messages;
};

// 根据 locale 区域获取 messages 配置文件
export const getMessagesForLocale = async (
  locale: Locale,
): Promise<Messages> => {
  const localMessages = await importLocale(locale);
  if (locale === routing.defaultLocale) {
    return localMessages;
  }

  // 默认区域
  const defaultLocaleMessages = await importLocale("zh");
  return deepmerge(defaultLocaleMessages, localMessages);
};

// 获取默认的 messages 配置文件
export const getDefaultMessages = async (): Promise<Messages> => {
  return await getMessagesForLocale("zh");
};
