// TODO - Document this now that it is a JS file
module.exports = {
	env: {
		browser: true,
		node: true,
		es6: true,
		jest: true,
	},
	extends: ['eslint:recommended', 'react-app'],
	parserOptions: {
		ecmaFeatures: {
			experimentalObjectRestSpread: true,
			jsx: true,
		},
		sourceType: 'module',
	},
	plugins: ['react-hooks'],
	rules: {
		'arrow-parens': ['error', 'as-needed'],
		quotes: [
			'warn',
			'single',
			{
				avoidEscape: true,
			},
		],
		'no-unused-vars': [
			'warn',
			{
				args: 'none',
			},
		],
		'import/first': 'off',
		'jsx-a11y/href-no-hash': 'off',
		'keyword-spacing': ['warn'],
		'no-mixed-spaces-and-tabs': ['warn', 'smart-tabs'],
		'no-console': 'warn',
		'no-restricted-globals': ['warn', 'location'],
		'no-empty': ['error', { allowEmptyCatch: true }],
		'react/jsx-equals-spacing': 'error',
		'react/jsx-indent-props': ['warn', 'tab'],
		'react/jsx-uses-react': 'error',
		'react/jsx-uses-vars': 'warn',
		'react/prop-types': 'warn',
		'react/no-unescaped-entities': 'off',
		'react-app/import/first': 'off',
		'react-hooks/rules-of-hooks': 'error',
		'react-hooks/exhaustive-deps': 'warn',
	},
}
