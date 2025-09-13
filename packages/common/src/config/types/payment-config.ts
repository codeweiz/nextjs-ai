// 支付配置
export interface PaymentConfig {
    // 提供商
    provider: "stripe" | "creem";

    // 货币种类
    currency: string;

    // 年付折扣
    yearlyDiscount: number;

    // 支付后重定向路由
    redirectAfterCheckout: string;

    // 价格计划
    plans: Record<string, Partial<PricePlan>>
}

// 价格计划
export interface PricePlan {
    // ID
    id: string;

    // 名称
    name: string

    // 描述
    description: string;

    // 特性
    features: string[];

    // 价格
    prices: Price[];

    // 是否免费
    isFree: boolean;

    // 是否终生
    isLifetime: boolean;

    // 是否企业
    isEnterprise: boolean;

    // 是否受欢迎
    popular: boolean;

    // 是否有亮点
    highlighted: boolean;
}

// 价格
export interface Price {
    // 类型
    type: PaymentType;

    // 价格 ID
    priceId: string;

    // 库存
    amount: number;

    // 支付时间间隔
    interval: PlanInterval;

    // 试用天数
    trialPeriodDays: number;
}

// 支付类型
export enum PaymentType {
    // 订阅
    SUBSCRIPTION = "subscription",

    // 一次
    ONE_TIME = "one-time"
}

// 计划间隔
export enum PlanInterval {
    // 月付
    MONTH = "monthly",

    // 年付
    YEAR = "yearly"
}
