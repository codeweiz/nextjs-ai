// 国际化配置
export interface I18nConfig {
    // 是否启用
    enabled: boolean;

    // 默认区域
    defaultLocale: string;

    // 区域 cookie 名
    localeCookieName: string;

    // 可用区域
    locales: Record<string, { name: string }>;
}
