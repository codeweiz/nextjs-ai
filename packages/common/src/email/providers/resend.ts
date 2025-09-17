import { Resend } from "resend";
import { MailProvider, SendParams } from "@microboat/common/email/types";
import { getConfig } from "@microboat/common/config";

/**
 * Resend邮件服务提供商实现
 * Resend是一个现代化的邮件发送服务，支持邮件发送和联系人管理
 * 官网：https://resend.com/
 */
export class ResendMailProvider implements MailProvider {
	/** Resend SDK实例 */
	private resend: Resend;
	/** Resend受众ID，用于管理邮件列表订阅 */
	private audienceId?: string;

	/**
	 * 构造函数
	 * 初始化Resend客户端和相关配置
	 */
	constructor() {
		// 从环境变量获取API密钥
		const resendApiKey = process.env.RESEND_API_KEY;

		// 验证必需的环境变量
		if (!resendApiKey) {
			throw new Error("Environment variable RESEND_API_KEY is not set");
		}

		// 初始化Resend客户端
		this.resend = new Resend(resendApiKey);

		// 受众ID用于邮件列表管理，可选配置
		this.audienceId = process.env.RESEND_AUDIENCE_ID;
	}

	/**
	 * 发送邮件
	 * @param params 邮件发送参数
	 */
	async sendEmail(params: SendParams): Promise<void> {
		const appConfig = await getConfig();

		// 调用Resend API发送邮件
		const { data, error } = await this.resend.emails.send({
			from: appConfig.mail.from,
			to: params.to,
			subject: params.subject,
			html: params.html,
			text: params.text,
		});

		// 检查发送结果，如有错误则抛出异常
		if (error) {
			console.error("Could not send email", error);
			throw new Error("Could not send email");
		}
	}

	/**
	 * 根据邮箱地址查找联系人
	 * @param email 邮箱地址
	 * @returns 联系人信息或null（如果未找到）
	 */
	private async findContactByEmail(email: string): Promise<any | null> {
		// 检查受众ID是否配置
		if (!this.audienceId) {
			throw new Error("RESEND_AUDIENCE_ID environment variable is not set");
		}

		try {
			// 获取所有联系人列表
			const { data, error } = await this.resend.contacts.list({
				audienceId: this.audienceId,
			});

			if (error) {
				console.error("Error listing contacts:", error);
				return null;
			}

			// 在联系人列表中查找匹配的邮箱
			if (data?.data && Array.isArray(data.data)) {
				return data.data.find((contact) => contact.email === email) || null;
			}

			return null;
		} catch (error) {
			console.error("Error finding contact by email:", error);
			return null;
		}
	}

	/**
	 * 订阅邮件列表
	 * 如果联系人已存在则更新订阅状态，否则创建新联系人
	 * @param email 邮箱地址
	 */
	async subscribe(email: string): Promise<void> {
		// 检查受众ID配置
		if (!this.audienceId) {
			throw new Error("RESEND_AUDIENCE_ID environment variable is not set");
		}

		try {
			// 先查找是否已存在该联系人
			const existingContact = await this.findContactByEmail(email);

			// 如果联系人已存在，更新其订阅状态
			if (existingContact) {
				// 更新现有联系人的订阅状态为已订阅
				const { error } = await this.resend.contacts.update({
					id: existingContact.id,
					audienceId: this.audienceId,
					email,
					unsubscribed: false,
				});

				if (error) {
					console.error("Error updating contact subscription:", error);
					throw new Error(
						`Could not update contact subscription: ${error.message}`,
					);
				}

				console.log(`Updated subscription for: ${email}`);
			} else {
				// 如果联系人不存在，创建新的联系人并设为已订阅状态
				const { error } = await this.resend.contacts.create({
					email,
					audienceId: this.audienceId,
					unsubscribed: false,
				});

				if (error) {
					console.error("Error creating contact:", error);
					throw new Error(`Could not create contact: ${error.message}`);
				}

				console.log(`Created new contact: ${email}`);
			}
		} catch (error) {
			console.error("Error subscribing to newsletter:", error);
			throw error;
		}
	}

	/**
	 * 取消订阅邮件列表
	 * @param email 邮箱地址
	 */
	async unsubscribe(email: string): Promise<void> {
		// 检查受众ID配置
		if (!this.audienceId) {
			throw new Error("RESEND_AUDIENCE_ID environment variable is not set");
		}

		try {
			// 查找要取消订阅的联系人
			const existingContact = await this.findContactByEmail(email);

			// 如果联系人不存在，直接返回
			if (!existingContact) {
				console.warn(`Contact not found for unsubscribe: ${email}`);
				return;
			}

			// 更新联系人状态为已取消订阅
			const { error } = await this.resend.contacts.update({
				id: existingContact.id,
				audienceId: this.audienceId,
				email,
				unsubscribed: true,
			});

			if (error) {
				console.error("Error unsubscribing contact:", error);
				throw new Error(`Could not unsubscribe contact: ${error.message}`);
			}

			console.log(`Unsubscribed: ${email}`);
		} catch (error) {
			console.error("Error unsubscribing from newsletter:", error);
			throw error;
		}
	}

	/**
	 * 检查邮箱是否已订阅
	 * @param email 邮箱地址
	 * @returns 是否已订阅
	 */
	async isSubscribed(email: string): Promise<boolean> {
		// 检查受众ID配置
		if (!this.audienceId) {
			throw new Error("RESEND_AUDIENCE_ID environment variable is not set");
		}

		try {
			// 查找联系人信息
			const contact = await this.findContactByEmail(email);

			// 如果联系人不存在，说明未订阅
			if (!contact) {
				return false;
			}

			// 检查订阅状态：unsubscribed为false表示已订阅
			return contact.unsubscribed === false;
		} catch (error) {
			console.error("Error checking subscription status:", error);
			return false;
		}
	}
}
