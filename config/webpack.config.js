const merge = require('webpack-merge')
const parts = require('./webpack.parts')

const supportedLocales = (process.env.NMA_SUPPORTED_LOCALES || 'en').split(',')
// const Environment = require('./environments')

// const DsEnvironment = process.env.DS_ENV || Environment.Local

// -------------------------------------------------------------------------------------------------
// TODO - Document this
const generateConfig = locale =>
	merge([
		parts.basics(),
		parts.entry(),
		parts.output(locale),
		parts.resolve(locale),
		parts.modules(),
		parts.plugins(locale),
		parts.performance(),
		parts.optimization(locale),
		{
			// This is only used for debugging purposes
			// name: `Webpack - ${DsEnvironment.padEnd(5)} (${locale})`,
			// Some libraries import Node modules but don't use them in the browser.
			// Tell Webpack to provide empty mocks for them so importing them works.
			node: {
				fs: 'empty',
				net: 'empty',
				tls: 'empty',
			},
		},
	])

// -------------------------------------------------------------------------------------------------
const configs = supportedLocales.map(locale => generateConfig(locale))

// -------------------------------------------------------------------------------------------------
// console.log()
// console.log('NODE_ENV: ', process.env.NODE_ENV)
// console.log('DS_ENV: ', process.env.DS_ENV)
// console.log(JSON.stringify(configs[0].entry, null, 2));
// console.log()
// -------------------------------------------------------------------------------------------------

module.exports = configs
