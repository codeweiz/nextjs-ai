import type {Locale, Messages} from "next-intl";
import {getTemplate, mailTemplates, TemplateKey} from "@microboat/common/email/templates";
import {getAppConfig} from "@microboat/common/config";
import {getMailProvider} from "@microboat/common/email/providers";

/**
 * 发送邮件的核心函数
 * 支持两种模式：
 * 1. 使用预定义模板发送邮件
 * 2. 直接发送自定义内容邮件
 *
 * @template T 模板键类型
 * @param params 邮件参数，支持模板模式或自定义内容模式
 * @returns Promise<boolean> 发送成功返回true，失败返回false
 */
export async function sendEmail<T extends TemplateKey>(
    params: {
        /** 收件人邮箱地址 */
        to: string;
        /** 语言区域，默认使用应用配置的默认语言 */
        locale?: Locale;
        messages: Messages;
    } & (
        | {
        /** 模板键，用于指定使用哪个邮件模板 */
        templateKey: T;
        /** 模板上下文数据，不包括locale和messages */
        context: Omit<
            Parameters<(typeof mailTemplates)[T]>[0],
            "locale" | "messages"
        >;
    }
        | {
        /** 邮件主题 */
        subject: string;
        /** 纯文本内容 */
        text?: string;
        /** HTML内容 */
        html?: string;
    }
        ),
) {
    // 解构参数，设置默认语言
    const { to, locale = getAppConfig().i18n.defaultLocale, messages } = params;

    let html: string;
    let text: string;
    let subject: string;

    // 判断是使用模板还是自定义内容
    if ("templateKey" in params) {
        // 模板模式：根据模板键和上下文生成邮件内容
        const { templateKey, context } = params;
        const template = await getTemplate({
            templateKey,
            context,
            locale,
            messages
        });
        subject = template.subject;
        text = template.text;
        html = template.html;
    } else {
        // 自定义内容模式：直接使用提供的内容
        subject = params.subject;
        text = params.text ?? "";
        html = params.html ?? "";
    }

    try {
        // 调用邮件提供商发送邮件
        await getMailProvider().sendEmail({
            to,
            subject,
            text,
            html,
        });
        return true;
    } catch (e) {
        console.error("send email failed", e);
        return false;
    }
}
