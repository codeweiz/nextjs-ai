import { ResendMailProvider } from "./resend";
import { PlunkMailProvider } from "./plunk";
import { MailProvider } from "@microboat/common/email/types";
import { getAppConfig } from "@microboat/common/config";

/**
 * 邮件服务提供商工厂
 * 根据配置选择并创建合适的邮件服务提供商实例
 */

/** 支持的邮件服务提供商映射表 */
const providers = {
	resend: ResendMailProvider,
	plunk: PlunkMailProvider,
} as const;

/** 邮件服务提供商单例实例 */
let mailProviderInstance: MailProvider | null = null;

/**
 * 获取邮件服务提供商实例
 * 使用单例模式，首次调用时根据配置创建实例，后续调用直接返回缓存的实例
 *
 * @returns MailProvider 邮件服务提供商实例
 */
export function getMailProvider(): MailProvider {
	// 如果已有实例，直接返回
	if (mailProviderInstance) {
		return mailProviderInstance;
	}

	// 根据配置创建对应的邮件服务提供商实例
	const provider = getAppConfig().mail.provider as keyof typeof providers;
	mailProviderInstance = new providers[provider]();
	return mailProviderInstance;
}
