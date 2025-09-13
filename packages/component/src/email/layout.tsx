import {
	Container,
	Font,
	Head,
	Html,
	Section,
	Tailwind,
} from "@react-email/components";

/**
 * 邮件布局组件的Props接口
 */
interface EmailLayoutProps {
	/** 子组件内容 */
	children: React.ReactNode;
}

/**
 * 邮件布局组件
 * 为所有邮件模板提供统一的布局和样式
 * 包含：
 * - HTML基本结构
 * - Inter字体设置
 * - Tailwind CSS样式支持
 * - 响应式布局容器
 *
 * @param props 组件属性
 * @returns JSX.Element 邮件布局组件
 */
export default function EmailLayout({ children }: EmailLayoutProps) {
	return (
		<Html lang="en">
			<Head>
				{/* 设置Inter字体，回退到Arial */}
				<Font
					fontFamily="Inter"
					fallbackFontFamily="Arial"
					fontWeight={400}
					fontStyle="normal"
				/>
			</Head>
			{/* 启用Tailwind CSS支持 */}
			<Tailwind>
				{/* 外层背景区域 */}
				<Section className="bg-background p-4">
					{/* 内容容器，带圆角和卡片样式 */}
					<Container className="rounded-lg bg-card p-6 text-card-foreground">
						{children}
					</Container>
				</Section>
			</Tailwind>
		</Html>
	);
}
