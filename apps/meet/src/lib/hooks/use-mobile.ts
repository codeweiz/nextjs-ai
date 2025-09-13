import { useEffect, useState } from "react";

// 移动设备的断点宽度 768px
const MOBILE_BREAKPOINT = 768;

/**
 * 检测当前设备是否为移动设备的 React Hook
 *
 * 使用 matchMedia API 监听屏幕尺寸变化，在窗口宽度小于 MOBILE_BREAKPOINT 时返回 true
 * 初始状态为 undefined，用于避免水化不匹配的问题
 *
 * @return 是否为移动设备，初始为 undefined
 *
 * @example
 * const isMobile = useIsMobile();
 * if (!isMobile) {
 *     // 移动设备逻辑
 * }
 * */
export function useIsMobile() {
  // 设置初始状态为 undefined，避免服务端渲染和客户端水化时不匹配
  const [isMobile, setIsMobile] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    // 创建媒体查询对象，监听屏幕宽度变化
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    // 屏幕尺寸变化时的处理函数
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };

    // 监听屏幕尺寸变化事件
    mql.addEventListener("change", onChange);
    // 设置初始值
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    // 清理事件监听器
    return () => mql.removeEventListener("change", onChange);
  }, []);

  // 返回布尔值，将 undefined 转换为 false
  return !!isMobile;
}
