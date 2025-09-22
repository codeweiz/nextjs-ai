// 测试环境配置
export const testConfig = {
	mail: {
		provider: 'resend',
		testEmail: 'test@example.com', // 可以设置为真实邮箱地址来接收测试邮件
	},
	i18n: {
		defaultLocale: 'zh',
	},
};

// 测试用的翻译消息
export const testMessages = {
	mail: {
		emailVerification: {
			subject: '验证您的邮箱地址',
			body: '您好 {name}，请点击下面的链接验证您的邮箱地址。',
			confirmEmail: '验证邮箱',
		},
		magicLink: {
			subject: '您的登录链接',
			body: '点击下面的链接登录您的账户。',
			login: '登录',
		},
		forgotPassword: {
			subject: '重置您的密码',
			body: '您好 {name}，点击下面的链接重置您的密码。',
			resetPassword: '重置密码',
		},
		newsletterSignup: {
			subject: '欢迎订阅我们的邮件列表',
			body: '感谢您订阅我们的邮件列表！',
		},
		contactForm: {
			subject: '新的联系表单消息',
			greeting: '您好，收到来自 {name} 的新消息。',
			fromLabel: '发件人：',
			emailLabel: '邮箱：',
			messageLabel: '消息内容：',
		},
		common: {
			openLinkInBrowser: '如果按钮无法点击，请复制以下链接到浏览器中打开：',
			useLink: '请使用下面的链接：',
		},
	},
};