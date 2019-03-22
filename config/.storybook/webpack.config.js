const path = require('path')

// Load the default config generator.

module.exports = ({ config, mode }) => {
	// Optimize babel-loading modules by restricting where it can look
	config.module.rules[0].include = [
		path.resolve(__dirname, '../../src'),
		path.resolve(__dirname, '../../config'),
		path.resolve(__dirname, '../../docs'),
	]

	// Add the src folder to webpack module resolution
	config.resolve.modules = [path.resolve(__dirname, '../../src'), ...config.resolve.modules]

	if (process.env.NODE_ENV === 'production') {
		config.plugins.forEach(plugin => {
			if (plugin && plugin.options && plugin.options.uglifyOptions) {
				plugin.options.uglifyOptions.cache = true
				plugin.options.uglifyOptions.parallel = true
			}
		})
	}

	// Add the storybook config folder as a webpack alias to make things sane
	config.resolve.alias = {
		StorybookConfig: path.resolve(__dirname),
	}

	// Open the browser by default
	// if (env !== 'PRODUCTION')
	// 	config.plugins.push(new OpenBrowserPlugin({ url: 'http://localhost:9004/' }))

	config.performance = {
		hints: 'warning',
	}

	// console.log()
	// console.log(JSON.stringify(config, null, 2))
	// console.log()

	return config
}
