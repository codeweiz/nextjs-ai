import { Link, Text } from "@react-email/components";
import React from "react";
import { createTranslator } from "use-intl/core";
import { I18nEmailProps } from "@microboat/common/email/types";
import EmailLayout from "@microboat/component/email/layout";
import EmailButton from "@microboat/component/email/email-button";

/**
 * 魔法链接登录邮件模板
 * 用于发送无密码登录链接的邮件
 * 用户点击邮件中的链接即可直接登录系统
 *
 * @param props 组件属性
 * @param props.url 魔法链接登录URL
 * @param props.locale 语言设置
 * @param props.messages 翻译消息
 * @returns JSX.Element 魔法链接邮件组件
 */
export function MagicLink({
	url,
	locale,
	messages,
}: {
	/** 魔法链接登录URL */
	url: string;
} & I18nEmailProps) {
	// 创建翻译函数，用于获取对应语言的文本
	const t = createTranslator({
		locale,
		messages,
	});

	return (
		<EmailLayout>
			{/* 邮件主体内容 */}
			<Text>{t("mail.magicLink.body")}</Text>

			{/* 使用说明 */}
			<Text>{t("mail.common.useLink")}</Text>

			{/* 登录按钮 */}
			<EmailButton href={url}>{t("mail.magicLink.login")} &rarr;</EmailButton>

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

export default MagicLink;
