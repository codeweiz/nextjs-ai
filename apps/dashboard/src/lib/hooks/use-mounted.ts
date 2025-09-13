import {useEffect, useState} from "react";


/**
 * 组件挂在状态检测钩子
 * 用于检测组件是否已经在客户端挂载完成
 *
 * 主要用途：
 * 1、避免服务端渲染和客户端水化时的不匹配
 * 2、在组件挂载后才执行某些客户端操作
 *
 * @return 组件是否已经挂载
 *
 * @example
 * const mounted = useMounted()
 * if (!mounted) {
 *     // 服务端渲染时不显示
 *     return null;
 * }
 * */
export function useMounted() {
    // 初始状态为 false，表示未挂载
    const [mounted, setMounted] = useState<boolean>(false)

    // 监听
    useEffect(() => {
        // 组件挂载后设置为 true
        setMounted(true)
    }, []);

    return mounted;
}
