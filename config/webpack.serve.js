'use strict'

// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = 'development'
process.env.NODE_ENV = 'development'
process.env.DS_ENV = 'LOCAL'

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', err => {
	throw err
})

// Ensure environment variables are read.
require('../config/env')

const serve = require('webpack-serve')
const chalk = require('chalk')
// const { execSync } = require('child_process');

const config = require('./webpack.config')[0]
const port = parseInt(process.env.PORT, 10) || 9003

const devServerConfig = {
	config,
	port,
	// http2: true,
	open: true,
	// host: process.env.HOST,
	// add: (app, middleware, options) => {
	// 	app.use(convert(proxy('/v1', { target: process.env.APIHOST })));
	// },
	dev: {
		publicPath: '/',
	},
	// on: {
	// 	listening: () => {
	// 		execSync('ps cax | grep "Google Chrome"');
	// 		execSync(
	// 			`osascript utils/chrome.applescript "${encodeURI(
	// 				`http://localhost:${port}`
	// 			)}"`,
	// 			{
	// 				cwd: __dirname,
	// 				stdio: 'ignore',
	// 			}
	// 		);
	// 	},
	// },
}

// Return the colorful nonsense if we want verbose output
if (process.env.NMA_BUILD_LOG_LEVEL !== 'verbose') {
	devServerConfig.dev.stats = 'minimal'
}

serve(devServerConfig).then(server => {
	server.on('build-started', ({ compiler }) => {
		console.log(chalk.cyanBright('\n🤩   RegFlow Build Started...'))
	})

	server.on('build-finished', ({ compiler, stats }) => {
		console.log(chalk.magentaBright('\n🎸  RegFlow Build Finished...'))
	})

	server.on('compiler-warning', ({ compiler, json }) => {
		console.log(chalk.yellowBright('\n⚠️⚠️⚠️  INCOMING COMPLAINTS ⚠️⚠️⚠️'))
		// console.log(json.warnings);
	})

	server.on('compiler-error', ({ compiler, json }) => {
		console.log(chalk.redBright('\n💥💥💥  INCOMING ERRORS  💥💥💥'))
		// console.log(json.errors);
	})

	server.on('listening', ({ server, options }) => {
		console.log(chalk.greenBright('\n☎️   The government is listening...'))
	})
	;['SIGINT', 'SIGTERM'].forEach(function(sig) {
		process.on(sig, function() {
			console.log(chalk.magentaBright(`\n🗑️  Closing the RegFlow dev server...`))
			server.close()
			process.exit()
		})
	})
})
