import React from "react";

// UI 配置
export interface UiConfig {

    // 主题
    theme: {
        // 是否启用
        enabled: boolean;

        // 默认模式：跟随系统、明亮、暗夜
        defaultMode: "system" | "light" | "dark";
    }
}

// 边栏导航项
export type SidebarNavItem = {
    // ID
    id: string;

    // 标题
    title: string;

    // 图标
    icon?: React.ReactNode;

    // 路由
    href?: string;
}

// 嵌套边栏导航项
export type SidebarNestedNavItem = SidebarNavItem & {
    items?: SidebarNavItem[]
}
