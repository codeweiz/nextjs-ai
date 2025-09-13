import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextRequest, NextResponse } from "next/server";

// 识别用户的 cookie 或浏览器语言
// 如果是默认语言（如 en），不加前缀（保持 /）
// 如果是其它语言（如 zh），自动跳到 /zh/
const intlMiddleware = createMiddleware(routing);

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // 对 /app 开头的路径不做 locale 处理
  if (pathname.startsWith("/app")) {
    // 直接放行，不走 next-intl
    return NextResponse.next();
  }

  // 对 /auth 开头的路径不做 locale 处理
  if (pathname.startsWith("/auth")) {
    // 直接放行，不走 next-intl
    return NextResponse.next();
  }

  return intlMiddleware(req);
}

export const config = {
  // 匹配需要 i18n 的路径
  matcher: [
    "/((?!api|images|image-proxy|fonts|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.svg|.*\\.png|.*\\.jpg|.*\\.jpeg|.*\\.gif|.*\\.webp|.*\\.ico).*)",
  ],
};
