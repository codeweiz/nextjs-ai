/** @type {import('jest').Config} */
module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'jsdom',
	setupFilesAfterEnv: ['<rootDir>/src/test/setup.ts'],
	moduleNameMapper: {
		'^@microboat/common/(.*)$': '<rootDir>/src/$1',
		'^@microboat/component/(.*)$': '<rootDir>/../component/src/$1',
		'^@microboat/app-config$': '<rootDir>/src/test/mocks/app-config.ts',
	},
	testMatch: [
		'<rootDir>/src/**/__tests__/**/*.(ts|tsx|js)',
		'<rootDir>/src/**/*.(test|spec).(ts|tsx|js)',
	],
	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
	transform: {
		'^.+\\.(ts|tsx)$': ['ts-jest', {
			tsconfig: {
				jsx: 'react-jsx',
			},
		}],
	},
	transformIgnorePatterns: [
		'node_modules/(?!(next-safe-action|@react-email|use-intl|@react-email)/)',
	],
	collectCoverageFrom: [
		'src/**/*.(ts|tsx)',
		'!src/**/*.d.ts',
		'!src/test/**/*',
	],
	coverageDirectory: 'coverage',
	coverageReporters: ['text', 'lcov', 'html'],
	verbose: true,
	bail: false,
};