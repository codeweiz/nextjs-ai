// 网站元数据配置
export interface MetadataConfig {
    // 网站名
    name: string;

    // 网站标题
    title: string;

    // 网站描述
    description: string;

    // 相关图片
    images: {
        // 明亮主题 logo
        logoLight: string;

        // 暗夜主题 logo
        logoDark: string;

        // og
        ogImage: string;
    };

    // 关键词
    keywords: string[];
}
