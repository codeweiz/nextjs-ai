import { Heading, Text } from "@react-email/components";
import React from "react";
import { createTranslator } from "use-intl/core";
import { I18nEmailProps } from "@microboat/common/email/types";
import EmailLayout from "@microboat/component/email/layout";

/**
 * 邮件列表订阅欢迎邮件模板
 * 用于向新订阅者发送欢迎邮件
 * 确认订阅成功并表示欢迎
 *
 * @param props 组件属性
 * @param props.locale 语言设置
 * @param props.messages 翻译消息
 * @returns JSX.Element 邮件列表订阅欢迎邮件组件
 */
export function NewsletterSignup({ locale, messages }: I18nEmailProps) {
	// 创建翻译函数，用于获取对应语言的文本
	const t = createTranslator({
		locale,
		messages,
	});

	return (
		<EmailLayout>
			{/* 欢迎标题 */}
			<Heading className="text-xl">
				{t("mail.newsletterSignup.subject")}
			</Heading>
			{/* 欢迎内容 */}
			<Text>{t("mail.newsletterSignup.body")}</Text>
		</EmailLayout>
	);
}

export default NewsletterSignup;
