import { z } from "zod";
import { actionClient } from "../utils";
import {getMailProvider} from "@microboat/common/email/providers";


/**
 * 邮件订阅相关的服务器动作
 * 使用safe-action库进行类型安全的服务器端操作
 */

/** 邮件验证模式：验证邮箱格式 */
const newsletterSchema = z.object({
    email: z.string().email(),
});

/**
 * 订阅邮件列表的服务器动作
 * 接收邮箱地址并将其添加到邮件列表中
 */
export const subscribeToNewsletter = actionClient
    .inputSchema(newsletterSchema)
    .outputSchema(z.void())
    .action(async ({ parsedInput: { email } }) => {
        const mailProvider = getMailProvider();
        await mailProvider.subscribe(email);
    });

/**
 * 取消订阅邮件列表的服务器动作
 * 接收邮箱地址并将其从邮件列表中移除
 */
export const unsubscribeFromNewsletter = actionClient
    .inputSchema(newsletterSchema)
    .outputSchema(z.void())
    .action(async ({ parsedInput: { email } }) => {
        const mailProvider = getMailProvider();
        await mailProvider.unsubscribe(email);
    });

/**
 * 检查邮箱是否已订阅的服务器动作
 * 返回邮箱是否在邮件列表中
 */
export const isSubscribedToNewsletter = actionClient
    .inputSchema(newsletterSchema)
    .outputSchema(z.boolean())
    .action(async ({ parsedInput: { email } }) => {
        const mailProvider = getMailProvider();
        return await mailProvider.isSubscribed(email);
    });
