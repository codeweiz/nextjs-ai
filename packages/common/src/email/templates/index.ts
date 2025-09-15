import {render} from "@react-email/render";
import type {Locale, Messages} from "next-intl";
import {ContactForm} from "./contact-form";
import {EmailVerification} from "./email-verification";
import {ForgotPassword} from "./forgot-password";
import {MagicLink} from "./magic-link";
import {NewsletterSignup} from "./newsletter-signup";

/**
 * 邮件模板映射表
 * 包含所有可用的邮件模板组件
 * - magicLink: 魔法链接登录邮件
 * - forgotPassword: 忘记密码重置邮件
 * - newsletterSignup: 邮件列表订阅欢迎邮件
 * - emailVerification: 邮箱验证邮件
 * - contactForm: 联系表单通知邮件
 */
export const mailTemplates = {
    magicLink: MagicLink,
    forgotPassword: ForgotPassword,
    newsletterSignup: NewsletterSignup,
    emailVerification: EmailVerification,
    contactForm: ContactForm,
} as const;

/** 邮件模板键类型 */
export type TemplateKey = keyof typeof mailTemplates;

/**
 * 获取邮件模板内容
 * 根据模板键、上下文数据和语言设置生成最终的邮件内容
 *
 * @template T 模板键类型
 * @param params 参数对象
 * @param params.templateKey 模板键名
 * @param params.context 模板上下文数据（不包含locale和messages）
 * @param params.locale 语言设置
 * @returns Promise<{html: string, text: string, subject: string}> 邮件内容对象
 */
export async function getTemplate<T extends TemplateKey>({
                                                             templateKey,
                                                             context,
                                                             locale,
                                                             messages
                                                         }: {
    templateKey: T;
    context: Omit<
        Parameters<(typeof mailTemplates)[T]>[0],
        "locale" | "messages"
    >;
    locale: Locale;
    messages: Messages;
}) {
    // 获取指定的模板组件
    const template = mailTemplates[templateKey];

    // 使用上下文数据和翻译消息渲染模板
    const email = template({
        ...(context as any),
        locale,
        messages,
    });

    // 从翻译消息中获取邮件主题
    const subject =
        "subject" in messages.mail[templateKey as keyof Messages["mail"]]
            ? messages.mail[templateKey].subject
            : "";

    // 使用React Email库渲染HTML和纯文本内容
    const html = await render(email);
    const text = await render(email, {plainText: true});
    return {html, text, subject};
}
