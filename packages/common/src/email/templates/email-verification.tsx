import { Link, Text } from "@react-email/components";
import React from "react";
import { createTranslator } from "use-intl/core";
import { I18nEmailProps } from "@microboat/common/email/types";
import EmailLayout from "@microboat/component/email/layout";
import EmailButton from "@microboat/component/email/email-button";

/**
 * 邮箱验证邮件模板
 * 用于发送邮箱地址验证链接的邮件
 * 用户注册后需要通过此邮件验证邮箱有效性
 *
 * @param props 组件属性
 * @param props.name 用户姓名
 * @param props.url 验证链接URL
 * @param props.locale 语言设置
 * @param props.messages 翻译消息
 * @returns JSX.Element 邮箱验证邮件组件
 */
export function EmailVerification({
	name,
	url,
	locale,
	messages,
}: {
	/** 用户姓名 */
	name: string;
	/** 邮箱验证链接URL */
	url: string;
} & I18nEmailProps) {
	// 创建翻译函数，用于获取对应语言的文本
	const t = createTranslator({
		locale,
		messages,
	});

	return (
		<EmailLayout>
			{/* 欢迎文本，包含用户姓名 */}
			<Text>{t("mail.emailVerification.body", { name })}</Text>

			{/* 验证邮箱按钮 */}
			<EmailButton href={url}>
				{t("mail.emailVerification.confirmEmail")} &rarr;
			</EmailButton>

			{/* 备用链接和说明文字 */}
			<Text className="text-muted-foreground text-sm">
				{t("mail.common.openLinkInBrowser")}
				<Link href={url} className="break-all">
					{url}
				</Link>
			</Text>
		</EmailLayout>
	);
}

export default EmailVerification;
