// 鉴权配置
export interface AuthConfig {
	// 启用社交登录
	enableSocialLogin: boolean;

	// 启用密码登录
	enablePasswordLogin: boolean;

	// 登录后重定向路由
	redirectAfterSignIn: string;

	// 登出后重定向路由
	redirectAfterLogout: string;
}
