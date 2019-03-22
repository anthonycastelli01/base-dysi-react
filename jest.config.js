module.exports = {
	collectCoverageFrom: ['src/**/*.js'],
	setupTestFrameworkScriptFile: '<rootDir>/config/jest/enzymeSetup.js',
	setupFiles: ['<rootDir>/config/polyfills.js', 'jest-localstorage-mock'],
	testMatch: ['<rootDir>/src/**/__tests__/**/*.js', '<rootDir>/src/**/?(*.)(spec|test).js'],
	testEnvironment: 'jsdom',
	testURL: 'http://localhost',
	transform: {
		'^.+\\.js$': '<rootDir>/node_modules/babel-jest',
		'^.+\\.css$': '<rootDir>/config/jest/cssTransform.js',
		'^(?!.*\\.(js|css|json)$)': '<rootDir>/config/jest/fileTransform.js',
	},
	transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.js$'],
	modulePaths: ['src'],
	moduleNameMapper: {
		'^react-native$': 'react-native-web',
	},
	moduleFileExtensions: ['web.js', 'js', 'json'],
}
