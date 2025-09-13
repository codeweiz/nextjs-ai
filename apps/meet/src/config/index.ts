import {
	defineAppConfig,
	PaymentType,
	PlanInterval,
} from "@microboat/common/config";

// 全局 app config
export const appConfig = defineAppConfig({
	metadata: {
		name: "AI 会议纪要",
		title: "AI 会议纪要",
		description: "实时会议转写，AI 提炼总结，一键同步任务！",
		images: {
			logoLight: "/logo-light.svg",
			logoDark: "/logo-dark.svg",
			ogImage: "/og-image.png",
		},
		keywords: ["AI 总结", "录音转文字", "同步任务"],
	},
	ui: {
		theme: {
			enabled: true,
			defaultMode: "system",
		},
	},
	mail: {
		provider: "resend",
		from: ("noreply@" + process.env.DOMAIN) as string,
		contact: ("contact@" + process.env.DOMAIN) as string,
	},
	i18n: {
		enabled: true,
		defaultLocale: "en",
		locales: {
			en: { name: "English" },
			zh: { name: "简体中文" },
		},
		localeCookieName: "NEXT_LOCALE",
	},
	auth: {
		enableSocialLogin: true,
		enablePasswordLogin: true,
		redirectAfterSignIn: "/app/dashboard",
		redirectAfterLogout: "/",
	},
	settings: {
		account: {
			canChangeEmail: true,
		},
	},
	storage: {
		provider: "s3",
		bucketNames: {
			avatars: process.env.NEXT_PUBLIC_AVATARS_BUCKET_NAME || "avatars",
		},
	},
	payment: {
		provider: "stripe",
		currency: "USD",
		yearlyDiscount: 20,
		redirectAfterCheckout: "/app/dashboard",
		plans: {
			free: {
				id: "free",
				isFree: true,
			},
			pro: {
				id: "pro",
				prices: [
					{
						type: PaymentType.SUBSCRIPTION,
						priceId: process.env.NEXT_PUBLIC_PRICE_ID_PRO_MONTHLY as string,
						amount: 9.9,
						interval: PlanInterval.MONTH,
						trialPeriodDays: 7,
					},
					{
						type: PaymentType.SUBSCRIPTION,
						priceId: process.env.NEXT_PUBLIC_PRICE_ID_PRO_YEARLY as string,
						amount: 99,
						interval: PlanInterval.YEAR,
						trialPeriodDays: 30,
					},
				],
				popular: true,
			},
			lifetime: {
				id: "lifetime",
				prices: [
					{
						type: PaymentType.ONE_TIME,
						priceId: process.env.NEXT_PUBLIC_PRICE_ID_LIFETIME as string,
						amount: 399,
					},
				],
				isLifetime: true,
			},
			enterprise: {
				id: "enterprise",
				isEnterprise: true,
				highlighted: true,
			},
		},
	},
	affiliate: {
		affonso: {
			enabled: false,
			id: process.env.NEXT_PUBLIC_AFFILIATE_AFFONSO_ID || "",
		},
	},
});
