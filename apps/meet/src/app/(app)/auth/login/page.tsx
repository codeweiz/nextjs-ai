import { getConfig } from "@microboat/common/config";

// 登录页面
export default async function LoginPage() {
	const appConfig = await getConfig();
	console.log("LoginPage", appConfig);

	return <div>Login Page</div>;
}
