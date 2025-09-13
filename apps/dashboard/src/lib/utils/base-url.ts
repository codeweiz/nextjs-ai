/**
 * 获取应用的基础 URL
 * 优先使用环境变量 NEXT_PUBLIC_APP_URL，如果没有设置则使用本地开发地址
 * 这个函数用于生成绝对 URL，特别是在服务端渲染时需要完整的 URL
 *
 * @return 应用的基础 URL
 *
 * @example
 * // "https://example.com" 或 "http://localhost:3000"
 * const baseUrl = getBaseUrl();
 * */
export function getBaseUrl() {
    return process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"
}
