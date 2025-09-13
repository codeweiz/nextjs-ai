import {ClassValue, clsx} from "clsx";
import {twMerge} from "tailwind-merge";

/**
 * 合并 CSS 类名的工具函数
 * 结合了 clsx 的条件类名处理和 tailwind-merge 的冲突解决
 *
 * @param inputs 可以是字符串、对象、数组等多种类型的类名输入
 * @return 合并并去重后的类名字符串
 *
 * @example
 * // 返回 'py-1 px-4'，px-4 会覆盖 px-2
 * cn('px-2 py-1', 'px-4')
 *
 * // 返回 'text-red-500 font-bold'
 * cn('text-red-500', { 'font-bold': true, 'italic': false})
 * */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}
