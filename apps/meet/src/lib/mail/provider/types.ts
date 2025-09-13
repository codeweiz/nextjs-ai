import {Locale, Messages} from "next-intl";

/**
 * 邮件服务提供接口定义
 * 统一了不同邮件服务商（Resend、Plunk 等）的通用方法
 * */
export interface MailProvider {
    /**
     * 发送邮件
     * @param params 邮件发送参数
     * */
    sendEmail(params: SendParams): Promise<void>;

    /**
     * 订阅邮件
     * @param email 要订阅的邮箱地址
     * */
    subscribe(email: string): Promise<void>;

    /**
     * 取消订阅邮件
     * @param email 要取消订阅的邮箱地址
     * */
    unsubscribe(email: string): Promise<void>;

    /**
     * 检查邮箱是否已订阅
     * @param email 要订阅的邮箱地址
     * @returns 是否已订阅
     * */
    isSubscribe(email: string): Promise<boolean>;
}

/**
 * 邮件发送参数接口
 * 定义了发送邮件时需要的基本信息
 * */
export interface SendParams {
    // 收件人邮箱地址
    to: string;

    // 邮件主题
    subject: string;

    // 纯文本内容
    text: string;

    // HTML 内容
    html?: string;
}

/**
 * 国际化邮件组件的 Props 接口
 * 包含语言设置和翻译消息
 * */
export interface I18nEmailProps {
    // 语言区域
    locale: Locale;

    // 翻译消息对象
    messages: Messages;
}
