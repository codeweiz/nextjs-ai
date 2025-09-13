// 邮箱配置
export interface MailConfig {
    // 提供商
    provider: "resend" | "plunk";

    // 发件人
    from: string;

    // 收件人
    contact: string;
}
