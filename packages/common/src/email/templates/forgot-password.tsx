import { Link, Text } from "@react-email/components";
import React from "react";
import { createTranslator } from "use-intl/core";
import {I18nEmailProps} from "@microboat/common/email/types";
import EmailLayout from "@microboat/component/email/layout";
import EmailButton from "@microboat/component/email/email-button";

/**
 * 忘记密码邮件模板
 * 用于发送密码重置链接的邮件
 * 用户忘记密码时可以通过此邮件重置密码
 * 
 * @param props 组件属性
 * @param props.name 用户姓名
 * @param props.url 密码重置链接URL
 * @param props.locale 语言设置
 * @param props.messages 翻译消息
 * @returns JSX.Element 忘记密码邮件组件
 */
export function ForgotPassword({
	name,
	url,
	locale,
	messages,
}: {
	/** 用户姓名 */
	name: string;
	/** 密码重置链接URL */
	url: string;
} & I18nEmailProps) {
	// 创建翻译函数，用于获取对应语言的文本
	const t = createTranslator({
		locale,
		messages,
	});

	return (
		<EmailLayout>
			{/* 邮件主体内容，包含用户姓名 */}
			<Text>{t("mail.forgotPassword.body", { name })}</Text>

			{/* 重置密码按钮 */}
			<EmailButton href={url}>
				{t("mail.forgotPassword.resetPassword")} &rarr;
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

export default ForgotPassword;
