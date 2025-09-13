import { AppConfig, PaymentType, PlanInterval } from "@microboat/common/config";
import { deepMerge } from "@microboat/common/utils";

// 使用 App Config
export const useAppConfig = (overrides?: Partial<AppConfig>) => {
	// 基础配置
	const baseAppConfig: AppConfig = {
		mail: {
			provider: "resend",
			from: ("noreply@" + process.env.DOMAIN) as string,
			contact: ("contact@" + process.env.DOMAIN) as string,
		},
		storage: {
			provider: "s3",
			bucketNames: {
				avatars: process.env.NEXT_PUBLIC_AVATARS_BUCKET_NAME || "avatars",
			},
		},
		payment: {
			provider: "creem",
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
				id: process.env.NEXT_PUBLIC_AFFILIATE_AFFONSO_ID || "",
				enabled: false,
			},
		},
	} as unknown as AppConfig;

	if (overrides) {
		return deepMerge(baseAppConfig, overrides);
	}

	return baseAppConfig;
};
