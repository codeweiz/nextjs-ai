import { getAppConfig } from "@microboat/common/config";

// 登录页面
export default function LoginPage() {
	const appConfig = getAppConfig();
	console.log("LoginPage", appConfig);

	return <div>Login Page</div>;
}
