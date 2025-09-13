import {createSafeActionClient} from "next-safe-action";

/**
 * 安全的 Server Action 客户端
 *
 * 使用 next-safe-action 库创建的客户端，用于创建类型安全的 Server Actions
 * 提供输入验证、错误处理和类型推断的功能
 *
 * @example
 * const myAction = actionClient
 * .inputSchema(z.object({name: z.string()}))
 * .action(async ({parsedInput}) => {
 *     // 处理逻辑
 *     return {
 *         success: true
 *     }
 * })
 * */
export const actionClient = createSafeActionClient();
