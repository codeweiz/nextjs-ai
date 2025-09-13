import { Button } from "@react-email/components";
import React, { type PropsWithChildren } from "react";

/**
 * 邮件按钮组件
 * 为邮件中的链接按钮提供统一的样式
 * 带有主色背景、圆角边框和响应式设计
 *
 * @param props 组件属性
 * @param props.href 链接地址
 * @param props.children 按钮文本内容
 * @returns JSX.Element 邮件按钮组件
 */
export default function EmailButton({
	href,
	children,
}: PropsWithChildren<{
	/** 按钮链接地址 */
	href: string;
}>) {
	return (
		<Button
			href={href}
			// 使用主色背景、圆角边框和适当的内边距
			className="rounded-md bg-primary px-4 py-2 text-lg text-primary-foreground"
		>
			{children}
		</Button>
	);
}
