import {
	MetadataConfig,
	I18nConfig,
	UiConfig,
	MailConfig,
	AuthConfig,
	SettingsConfig,
	StorageConfig,
	PaymentConfig,
	AffiliateConfig,
} from "@microboat/common/config/types";

// 应用程序配置
export type AppConfig = {
	// 网站元数据配置
	metadata: MetadataConfig;

	// 国际化配置
	i18n: I18nConfig;

	// UI 配置
	ui: UiConfig;

	// 邮件配置
	mail: MailConfig;

	// 鉴权配置
	auth: AuthConfig;

	// 系统设置配置
	settings: SettingsConfig;

	// 存储配置
	storage: StorageConfig;

	// 支付配置
	payment: PaymentConfig;

	// 营销联盟配置
	affiliate: AffiliateConfig;
};

// App Config 单例
let appConfigInstance: AppConfig | null = null;

// 定义全局应用配置
export function defineAppConfig(appConfig: AppConfig): AppConfig {
	appConfigInstance = appConfig;
	return appConfigInstance;
}

// 获取 App Config，非组件使用
export function getAppConfig(): AppConfig {
	if (!appConfigInstance) {
		throw new Error("缺少 defineAppConfig");
	}
	return appConfigInstance;
}
