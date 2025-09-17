import { MailProvider, SendParams } from "@microboat/common/email/types";
import { getConfig } from "@microboat/common/config";

/**
 * Plunk邮件服务提供商实现
 * Plunk是一个轻量级的邮件发送服务
 * 官网：https://useplunk.com/
 * 注意：此实现仅支持邮件发送，不支持邮件列表管理功能
 */
export class PlunkMailProvider implements MailProvider {
	/** Plunk API密钥 */
	private apiKey: string;

	/**
	 * 构造函数
	 * 初始化Plunk邮件服务配置
	 */
	constructor() {
		// 从环境变量获取API密钥
		const apiKey = process.env.PLUNK_API_KEY;

		// 验证必需的环境变量
		if (!apiKey) {
			throw new Error("Environment variable PLUNK_API_KEY is not set");
		}

		this.apiKey = apiKey;
	}

	/**
	 * 发送邮件
	 * @param params 邮件发送参数
	 */
	async sendEmail(params: SendParams): Promise<void> {
		const appConfig = await getConfig();

		// 调用Plunk API发送邮件
		const response = await fetch("https://api.useplunk.com/v1/send", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				// 使用Bearer token进行身份验证
				Authorization: `Bearer ${this.apiKey}`,
			},
			body: JSON.stringify({
				to: params.to,
				from: appConfig.mail.from,
				subject: params.subject,
				body: params.html, // Plunk使用'body'字段作为HTML内容
				text: params.text,
			}),
		});

		// 检查响应状态，如果发送失败则抛出异常
		if (!response.ok) {
			console.error("Could not send email", await response.json());
			throw new Error("Could not send email");
		}
	}

	/**
	 * 订阅邮件列表
	 * 注意：Plunk服务提供商暂未实现此功能
	 * @param email 邮箱地址
	 */
	subscribe(email: string): Promise<void> {
		throw new Error("Method not implemented.");
	}

	/**
	 * 取消订阅邮件列表
	 * 注意：Plunk服务提供商暂未实现此功能
	 * @param email 邮箱地址
	 */
	unsubscribe(email: string): Promise<void> {
		throw new Error("Method not implemented.");
	}

	/**
	 * 检查邮箱是否已订阅
	 * 注意：Plunk服务提供商暂未实现此功能
	 * @param email 邮箱地址
	 * @returns 是否已订阅
	 */
	isSubscribed(email: string): Promise<boolean> {
		throw new Error("Method not implemented.");
	}
}
