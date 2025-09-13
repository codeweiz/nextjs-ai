import { useTranslations } from "next-intl";
import Link from "next/link";

export default function DashboardPage() {
  // i18n
  const t = useTranslations();

  // 面包屑
  const breadcrumbs = [
    {
      label: t("menu.application.dashboard.title"),
      isCurrentPage: true,
    },
  ];

  return (
    <>
      <div className="w-full h-full flex justify-center items-center">
        仪表盘
      </div>

      <Link className="text-sky-300" href="/">
        点击跳转主页
      </Link>
    </>
  );
}
