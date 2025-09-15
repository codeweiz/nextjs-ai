import {Text} from "@react-email/components";
import React from "react";
import {createTranslator} from "use-intl/core";
import {I18nEmailProps} from "@microboat/common/email/types";
import EmailLayout from "@microboat/component/email/layout";

/**
 * 联系表单邮件模板
 * 用于将用户通过联系表单提交的消息转发给管理员
 * 包含用户的姓名、邮箱和消息内容
 *
 * @param props 组件属性
 * @param props.name 用户姓名
 * @param props.email 用户邮箱
 * @param props.message 用户消息内容
 * @param props.locale 语言设置
 * @param props.messages 翻译消息
 * @returns JSX.Element 联系表单邮件组件
 */
export function ContactForm({
                                name,
                                email,
                                message,
                                locale,
                                messages,
                            }: {
    /** 用户姓名 */
    name: string;
    /** 用户邮箱地址 */
    email: string;
    /** 用户消息内容 */
    message: string;
} & I18nEmailProps) {
    // 创建翻译函数，用于获取对应语言的文本
    const t = createTranslator({
        locale,
        messages,
    });

    return (
        <EmailLayout>
            {/* 问候语 */}
            <Text>{t("mail.contactForm.greeting", {name})}</Text>

            {/* 发件人信息 */}
            <Text className="font-semibold">
                {t("mail.contactForm.fromLabel")} {name}
            </Text>

            {/* 发件人邮箱 */}
            <Text className="font-semibold">
                {t("mail.contactForm.emailLabel")} {email}
            </Text>

            {/* 消息标签 */}
            <Text className="font-semibold">
                {t("mail.contactForm.messageLabel")}
            </Text>
            {/* 消息内容，保持换行格式 */}
            <Text className="whitespace-pre-wrap">{message}</Text>
        </EmailLayout>
    );
}

export default ContactForm;
