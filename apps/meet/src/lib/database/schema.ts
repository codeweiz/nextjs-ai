import {integer, sqliteTable, text, uniqueIndex} from "drizzle-orm/sqlite-core";

// 带 ID
const withId = () => ({
    id: text("id", {length: 255}).primaryKey()
})

// 带审计属性
const withAudit = () => ({
    // 创建时间
    createdAt: integer("created_at", {mode: "timestamp"}).notNull().default(new Date()),

    // 创建人
    createdBy: text("created_by", {length: 255}),

    // 更新时间
    updatedAt: integer("updated_at", {mode: "timestamp"}).notNull().default(new Date()),

    // 更新人
    updatedBy: text("updated_by", {length: 255}),
})

// 用户表
export const user = sqliteTable(
    "user",
    {
        // ID，主键
        ...withId(),

        // 审计属性
        ...withAudit(),

        // 名称，非空
        name: text("name").notNull(),

        // 邮箱，非空，唯一键
        email: text("email").notNull().unique(),

        // 邮箱是否认证，非空，布尔值，默认为 false
        emailVerified: integer("email_verified", {mode: "boolean"}).notNull().default(false),

        // 图片
        image: text("image"),

        // 消费者 ID
        customerId: text("customer_id"),

        // 角色
        role: text("role"),

        // 禁用
        banned: integer("banned", {mode: "boolean"}),

        // 禁用原因
        banReason: text("ban_reason"),

        // 禁用到期时间
        banExpires: integer("ban_expires", {mode: "timestamp"}),

        // 区域
        locale: text("locale")
    }
)

// 会话表
export const session = sqliteTable(
    "session",
    {
        // ID，主键
        ...withId(),

        // 审计属性
        ...withAudit(),

        // 用户 ID
        userId: text("user_id").notNull().references(() => user.id, {onDelete: "cascade"}),

        // IP 地址
        ipAddress: text("ip_address"),

        // 用户代理
        userAgent: text("user_agent"),

        // token 令牌
        token: text("token").notNull(),

        // 过期时间
        expiresAt: integer("expires_at", {mode: "timestamp"}).notNull(),

        // 被XXX冒充
        impersonatedBy: text("impersonated_by")
    },
    (table) => {
        return {
            // token 索引
            tokenIdx: uniqueIndex("token_index").on(table.token)
        }
    }
)

// 账户表
export const account = sqliteTable(
    "account",
    {
        // ID，主键
        ...withId(),

        // 审计属性
        ...withAudit(),

        // 用户 ID
        userId: text("user_id").notNull().references(() => user.id, {onDelete: "cascade"}),

        // 账户 ID
        accountId: text("account_id").notNull(),

        // 提供者 ID
        providerId: text("provider_id").notNull(),

        // 访问 token
        accessToken: text("access_token"),

        // 刷新 token
        refreshToken: text("refresh_token"),

        // id Token
        idToken: text("id_token"),

        // 过期时间
        expiresAt: integer("expires_at", {mode: "timestamp"}),

        // 密码
        password: text("password"),

        // 访问 token 过期时间
        accessTokenExpiresAt: integer("access_token_expires_at", {mode: "timestamp"}),

        // 刷新 token 过期时间
        refreshTokenExpiresAt: integer("refresh_token_expires_at", {mode: "timestamp"}),

        // 作用域
        scope: text("scope")
    },
    (table) => {
        return {
            // 用户 Id 索引
            userIdIdx: uniqueIndex("account_user_id_index").on(table.userId),

            // 账户 ID 索引
            accountIdIdx: uniqueIndex("account_account_id_idx").on(table.accountId)
        }
    }
)

// 认证表
export const verification = sqliteTable(
    "verification",
    {
        // ID，主键
        ...withId(),

        // 审计属性
        ...withAudit(),

        // identifier
        identifier: text("identifier").notNull(),

        // 值
        value: text("value").notNull(),

        // 过期时间
        expiresAt: integer("expires_at", {mode: "timestamp"}).notNull(),
    }
)


// pass key
export const passkey = sqliteTable(
    "passkey",
    {
        // ID，主键
        ...withId(),

        // 审计属性
        ...withAudit(),

        // 用户 ID
        userId: text("user_id").notNull().references(() => user.id, {onDelete: "cascade"}),

        // 名称
        name: text("name"),

        // 公钥
        publicKey: text("public_key").notNull(),

        // credential ID
        credentialId: text("credential_id").notNull(),

        // counter
        counter: integer("counter").notNull(),

        // 设备类型
        deviceType: text("device_type").notNull(),

        // 后备
        backedUp: text("backed_up").notNull(),

        // 运输
        transports: text("transports"),
    },
    (table) => {
        return {
            // 用户 Id 索引
            userIdIdx: uniqueIndex("passkey_user_id_index").on(table.userId),
        }
    }
)

// 购买记录表
export const purchase = sqliteTable(
    "purchase",
    {
        // ID，主键
        ...withId(),

        // 审计属性
        ...withAudit(),

        // 用户 ID
        userId: text("user_id").notNull().references(() => user.id, {onDelete: "cascade"}),

        // 类型
        type: text("type").notNull(),

        // 消费者 ID
        customerId: text("customer_id").notNull(),

        // 订阅 ID
        subscriptionId: text("subscription_id").unique(),

        // 价格 ID
        priceId: text("price_id").notNull(),

        // 购买状态
        status: text("status"),

        // 时间间隔
        interval: text("interval"),

        // 周期开始时间
        periodStart: integer("period_start", {mode: "timestamp"}),

        // 周期结束时间
        periodEnd: integer("period_end", {mode: "timestamp"}),

        // 是否周期结束后取消
        cancelAtPeriodEnd: integer("cancel_at_period_end", {mode: "boolean"}),

        // 试用开始时间
        trialStart: integer("trial_start", {mode: "timestamp"}),

        // 试用结束时间
        trialEnd: integer("trial_end", {mode: "timestamp"}),
    },
    (table) => {
        return {
            // 用户 Id 索引
            userIdIdx: uniqueIndex("purchase_user_id_index").on(table.userId),
        }
    }
)
