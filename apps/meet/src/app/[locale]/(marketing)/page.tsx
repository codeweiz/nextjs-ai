import Link from "next/link";

export default function Home() {
  return (
    <div className="overflow-x-hidden">
      <div className="w-full h-full flex justify-center items-center">主页</div>

      <Link className="text-sky-300" href="/app/dashboard">
        点击跳转仪表盘
      </Link>
    </div>
  );
}
