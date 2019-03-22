'use strict'

// NOTE: Use this to track down deprecation warnings
// process.traceDeprecation = true;

const autoprefixer = require('autoprefixer')
const path = require('path')
const webpack = require('webpack')

// Plugins
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const ManifestPlugin = require('webpack-manifest-plugin')
// const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin')
// const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin')
// const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin')
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

// Custom Resolvers
// const LocaleResolver = require('./plugins/LocaleResolver')
// const MomentTimezoneDataResolver = require('./plugins/MomentTimezoneDataResolver')

// Helpers Imports
const eslintFormatter = require('react-dev-utils/eslintFormatter')
const paths = require('./paths')
const getClientEnvironment = require('./env')
// const MomentLocales = require('./plugins/MomentLocaleMapper')

// DS Environment Helpers
const Environment = require('./environments')
const DsEnvironment = {
	IsLocal: process.env.DS_ENV === Environment.Local,
	IsTeamA: process.env.DS_ENV === Environment.TeamA,
	IsIntegration: process.env.DS_ENV === Environment.Integration,
	IsProduction: process.env.DS_ENV === Environment.Production,
	IsDeployed: process.env.DS_ENV !== Environment.Local,
}

// TODO - Document
const buildTime = Date.now()
const buildId = process.env.NMA_BUILD_ID || buildTime
const isProfileBuild = process.env.NMA_PROFILE_BUILD === true

// -------------------------------------------------------------------------------------------------
// Local Helpers

const publicPath = DsEnvironment.IsDeployed
	? // Webpack uses `publicPath` to determine where the app is being served from.
	  // It requires a trailing slash, or the file assets will get an incorrect path.
	  paths.servedPath
	: // Webpack uses `publicPath` to determine where the app is being served from.
	  // In development, we always serve from the root. This makes config easier.
	  '/'

// `publicUrl` is just like `publicPath`, but we will provide it to our app
// as %PUBLIC_URL% in `index.html` and `process.env.PUBLIC_URL` in JavaScript.
// Omit trailing slash as %PUBLIC_PATH%/xyz looks better than %PUBLIC_PATH%xyz.
const publicUrl = DsEnvironment.IsDeployed ? publicPath.slice(0, -1) : 'member'

// Get environment variables to inject into our app.
const env = getClientEnvironment(publicUrl)

// -------------------------------------------------------------------------------------------------

// -------------------------------------------------------------------------------------------------
// BASICS
const basics = () => {
	let basic = {
		// Attempt to continue if there are any errors?
		bail: DsEnvironment.IsDeployed,
		mode: DsEnvironment.IsDeployed ? 'production' : 'development',
	}

	if (DsEnvironment.IsLocal) {
		basic = {
			...basic,
			// You may want 'eval' instead if you prefer to see the compiled output in DevTools.
			// See the discussion in https://github.com/facebookincubator/create-react-app/issues/343.
			devtool: 'cheap-module-source-map',
		}
	} else if (DsEnvironment.IsTeamA) {
		basic = {
			...basic,
			devtool: 'source-map',
			stats: 'normal',
		}
	} else if (DsEnvironment.IsIntegration) {
		basic = {
			...basic,
			devtool: 'source-map',
		}
	} else if (DsEnvironment.IsProduction) {
		basic = {
			...basic,
			devtool: 'source-map',
		}
	}

	return basic
}

// -------------------------------------------------------------------------------------------------
// ENTRY
// 		These are the "entry points" to our application.
// 		This means they will be the "root" imports that are included in JS bundle.
// 		The first two entry points enable "hot" CSS and auto-refreshes for JS.
const entry = () => {
	// Deployed versions don't need dev servers or hot clients
	if (DsEnvironment.IsDeployed) {
		return {
			entry: [require.resolve('./polyfills'), paths.appIndexJs],
		}
	}
	// Local development builds
	else {
		return {
			entry: [
				// Include an alternative client for WebpackDevServer. A client's job is to
				// connect to WebpackDevServer by a socket and get notified about changes.
				// When you save a file, the client will either apply hot updates (in case
				// of CSS changes), or refresh the page (in case of JS changes). When you
				// make a syntax error, this client will display a syntax error overlay.
				// Note: instead of the default WebpackDevServer client, we use a custom one
				// to bring better experience for Create React App users. You can replace
				// the line below with these two lines if you prefer the stock client:
				// require.resolve('webpack-dev-server/client') + '?/',
				// require.resolve('webpack/hot/dev-server'),
				require.resolve('react-dev-utils/webpackHotDevClient'),
				// We ship a few polyfills by default:
				require.resolve('./polyfills'),
				// Errors should be considered fatal in development
				require.resolve('react-error-overlay'),
				// Finally, this is your app's code:
				paths.appIndexJs,
				// We include the app code last so that if there is a runtime error during
				// initialization, it doesn't blow up the WebpackDevServer client, and
				// changing JS code would still trigger a refresh.
			],
		}
	}
}

// -------------------------------------------------------------------------------------------------
// OUTPUT
//
const output = locale => {
	//
	if (DsEnvironment.IsDeployed) {
		const deployedPublicPath = process.env.NMAS_CDN_URL || publicPath
		return {
			output: {
				// The build folder.
				path: paths.appBuild,
				// Generated JS file names (with nested folders).
				// There will be one main bundle, and one file per asynchronous chunk.
				// We don't currently advertise code splitting but Webpack supports it.
				// filename: `static/js/${locale}/[name].[chunkhash:8].${locale}.js`,
				// chunkFilename: `static/js/${locale}/[name].[chunkhash:8].chunk.${locale}.js`,
				// We inferred the "public path" (such as / or /my-project) from homepage.
				publicPath: deployedPublicPath,
				// Point sourcemap entries to original disk location
				devtoolModuleFilenameTemplate: info =>
					path.relative(paths.appSrc, info.absoluteResourcePath),
			},
		}
	}
	//
	else {
		return {
			output: {
				// Next line is not used in dev but WebpackDevServer crashes without it:
				path: paths.appBuild,
				// Add /* filename */ comments to generated require()s in the output.
				pathinfo: true,
				// This does not produce a real file. It's just the virtual path that is
				// served by WebpackDevServer in development. This is the JS bundle
				// containing code from all our entry points, and the Webpack runtime.
				// filename: 'member/static/js/bundle.js',
				// There are also additional JS chunk files if you use code splitting.
				// chunkFilename: 'member/static/js/[name].chunk.js',
				// This is the URL that app is served from. We use "/" in development.
				publicPath: publicPath,
				// Point sourcemap entries to original disk location
				devtoolModuleFilenameTemplate: info => path.resolve(info.absoluteResourcePath),
			},
		}
	}
}

// -------------------------------------------------------------------------------------------------
// RESOLVE
//
const resolve = locale => {
	const moduleResolvePaths = DsEnvironment.IsDeployed
		? ['node_modules', paths.appSrc, paths.appLang, paths.appNodeModules]
		: ['node_modules', paths.appSrc, paths.appNodeModules]

	const commonResolve = {
		// These are the reasonable defaults supported by the Node ecosystem.
		extensions: ['.js'],

		alias: {
			// Support React Native Web
			// https://www.smashingmagazine.com/2016/08/a-glimpse-into-the-future-with-react-native-for-web/
			'react-native': 'react-native-web',
		},

		// This allows you to set a fallback for where Webpack should look for modules.
		// We placed these paths second because we want `node_modules` to "win"
		// if there are any conflicts. This matches Node resolution mechanism.
		// https://github.com/facebookincubator/create-react-app/issues/253
		modules: moduleResolvePaths.concat(
			// It is guaranteed to exist because we tweak it in `env.js`
			process.env.NODE_PATH.split(path.delimiter).filter(Boolean)
		),
	}

	if (DsEnvironment.IsDeployed) {
		return {
			resolve: {
				...commonResolve,
				plugins: [
					// Replaces dev lang files with the proper Smartling translations
					// new LocaleResolver(locale),
					// Strips off a bunch of moment data that we don't need for this specific locale
					// new MomentTimezoneDataResolver(),
				],
			},
		}
	} else {
		return {
			resolve: {
				...commonResolve,
				plugins: [
					// Prevents users from importing files from outside of src/ (or node_modules/).
					// This often causes confusion because we only process files within src/ with babel.
					// To fix this, we prevent you from importing files out of src/ -- if you'd like to,
					// please link the files into your node_modules/ and let module-resolution kick in.
					// Make sure your source files are compiled, as they will not be processed in any way.
					// new ModuleScopePlugin(paths.appSrc),
				],
			},
		}
	}
}

// -------------------------------------------------------------------------------------------------
// MODULE
//
const modules = () => {
	// Remove some JSX attributes while processing
	const attributesToRemove = [
		process.env.IsProduction ? 'data-component' : 'yyy',
		process.env.IsProduction ? 'data-test-id' : 'xxx',
	]

	const commonModule = {
		strictExportPresence: true,
		rules: [
			// TODO: Disable require.ensure as it's not a standard language feature.
			// We are waiting for https://github.com/facebookincubator/create-react-app/issues/2176.
			// { parser: { requireEnsure: false } },

			// It's important to do this before Babel processes the JS.
			{
				test: /\.js$/,
				include: paths.appSrc,
				exclude: /red5pro/,
				enforce: 'pre',
				loader: 'eslint-loader',
				options: {
					formatter: eslintFormatter,
				},
			},

			// NOTE ** ADDING/UPDATING LOADERS **
			// The "file" loader handles all assets unless explicitly excluded.
			// The `exclude` list *must* be updated with every change to loader extensions.
			// When adding a new loader, you must add its `test`
			// as a new entry in the `exclude` list in the "file" loader.

			// "file" loader makes sure those assets end up in the `build` folder.
			// When you `import` an asset, you get its filename.
			{
				exclude: [
					/\.html$/,
					/\.js$/,
					/\.css$/,
					/\.json$/,
					/\.bmp$/,
					/\.gif$/,
					/\.jpe?g$/,
					/\.png$/,
				],
				loader: require.resolve('file-loader'),
				options: {
					name: 'static/media/[name].[hash:8].[ext]',
				},
			},

			// "url" loader works just like "file" loader but it also embeds
			// assets smaller than specified size as data URLs to avoid requests.
			{
				test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
				loader: require.resolve('url-loader'),
				options: {
					limit: 10000,
					name: 'static/media/[name].[hash:8].[ext]',
				},
			},

			// Process JS with Babel.
			{
				test: /\.js$/,
				include: [paths.appSrc, paths.appLang],
				exclude: /red5pro/,
				loader: require.resolve('babel-loader'),
				options: {
					cacheDirectory: true,
					plugins: [
						// Lodash is stupid
						['lodash'],
						// This removes specified attributes from being output
						[
							'react-remove-properties',
							{
								properties: attributesToRemove,
							},
						],
						// Removes propTypes and imports
						// https://www.npmjs.com/package/babel-plugin-transform-react-remove-prop-types
						[
							'transform-react-remove-prop-types',
							{
								mode: 'remove',
								ignoreFilenames: ['node_modules'],
								removeImport: true,
							},
						],
					],
				},
			},

			// ** STOP ** Are you adding a new loader?
			// Remember to add the new extension(s) to the "file" loader exclusion list.
		],
	}

	if (DsEnvironment.IsDeployed) {
		return {
			module: {
				...commonModule,
				rules: [
					...commonModule.rules,
					{
						test: /\.css$/,
						exclude: /red5pro/,
						use: [
							// CSS Extraction Loader
							{
								loader: MiniCssExtractPlugin.loader,
							},
							// CSS Dependency Loader
							{
								loader: require.resolve('css-loader'),
								options: {
									importLoaders: 1,
									minimize: true,
									sourceMap: true,
								},
							},
							// CSS Post-Processing Loader
							{
								loader: require.resolve('postcss-loader'),
								options: {
									ident: 'postcss', // https://webpack.js.org/guides/migrating/#complex-options
									plugins: () => [
										require('postcss-flexbugs-fixes'),
										autoprefixer({
											flexbox: 'no-2009',
										}),
									],
								},
							},
						],
					},
					// Red5Pro
					{
						test: /\.css$/,
						include: /red5pro/,
						use: [
							// CSS Extraction Loader
							{
								loader: MiniCssExtractPlugin.loader,
							},
							// CSS Dependency Loader
							{
								loader: require.resolve('css-loader'),
								options: {
									importLoaders: 1,
									minimize: false,
									sourceMap: false,
								},
							},
						],
					},
				],
			},
		}
	} else {
		return {
			module: {
				...commonModule,
				rules: [
					...commonModule.rules,
					// "postcss" loader applies autoprefixer to our CSS.
					// "css" loader resolves paths in CSS and adds assets as dependencies.
					// "style" loader turns CSS into JS modules that inject <style> tags.
					// In production, we use a plugin to extract that CSS to a file, but
					// in development "style" loader enables hot editing of CSS.
					{
						test: /\.css$/,
						use: [
							{
								loader: require.resolve('style-loader'),
							},
							{
								loader: require.resolve('css-loader'),
								options: {
									importLoaders: 1,
								},
							},
							{
								loader: require.resolve('postcss-loader'),
								options: {
									ident: 'postcss', // https://webpack.js.org/guides/migrating/#complex-options
									plugins: () => [
										require('postcss-flexbugs-fixes'),
										autoprefixer({
											flexbox: 'no-2009',
										}),
									],
								},
							},
						],
					},
				],
			},
		}
	}
}

// -------------------------------------------------------------------------------------------------
// OPTIMIZATION
//
const optimization = locale => {
	if (DsEnvironment.IsDeployed) {
		return {
			optimization: {
				namedModules: true,

				// RUNTIME CHUNK
				// ------------------------
				// runtimeChunk: {
				// 	name: 'main',
				// },
				// runtimeChunk: 'single',

				// DEFAULT SPLIT CHUNKS
				// ------------------------
				// splitChunks: {
				// 	chunks: 'async',
				// 	minSize: 30000,
				// 	minChunks: 1,
				// 	maxAsyncRequests: 5,
				// 	maxInitialRequests: 3,
				// 	automaticNameDelimiter: '~',
				// 	name: true,
				// 	cacheGroups: {
				// 		vendors: {
				// 			test: /[\\/]node_modules[\\/]/,
				// 			priority: -10,
				// 		},
				// 		default: {
				// 			minChunks: 2,
				// 			priority: -20,
				// 			reuseExistingChunk: true,
				// 		},
				// 	},
				// },

				// MULTIPLE INITIAL CHUNKS
				// ------------------------
				// splitChunks: {
				// 	chunks: 'all',
				// 	maxInitialRequests: 2,
				// },

				// MINIMIZER
				// ------------------------
				minimizer: [
					// Minify the JS
					new UglifyJsPlugin({
						// compress: false,
						uglifyOptions: {
							compress: {
								warnings: false,
								// Disabled because of an issue with Uglify breaking seemingly valid code:
								// https://github.com/facebookincubator/create-react-app/issues/2376
								// Pending further investigation:
								// https://github.com/mishoo/UglifyJS2/issues/2011
								comparisons: false,
								drop_console: true,

								// What Slack uses
								// arrows: false,
								// booleans: false,
								// cascade: false,
								// collapse_vars: false,
								// comparisons: false,
								// computed_props: false,
								// hoist_funs: false,
								// hoist_props: false,
								// hoist_vars: false,
								// if_return: false,
								// inline: false,
								// join_vars: false,
								// keep_infinity: true,
								// loops: false,
								// negate_iife: false,
								// properties: false,
								// reduce_funcs: false,
								// reduce_vars: false,
								// sequences: false,
								// side_effects: false,
								// switches: false,
								// top_retain: false,
								// toplevel: false,
								// typeofs: false,
								// unused: false,
								// // warnings: false,
								// // Switch off all types of compression except those needed to convince
								// // react-devtools that we're using a production build
								// conditionals: true,
								// dead_code: true,
								// evaluate: true,
							},
						},
						sourceMap: true,
						parallel: true,
						cache: true,
						exclude: /red5pro/,
					}),
					// Minify the CSS
					new OptimizeCSSAssetsPlugin({
						cssProcessorOptions: {
							map: {
								inline: false,
							},
						},
						assetNameRegExp: /\.optimize\.css$/g,
						cssProcessorOptions: { discardComments: { removeAll: true } },
					}),
				],
			},
		}
	}
}

// -------------------------------------------------------------------------------------------------
// PLUGINS
//
const plugins = locale => {
	const commonPlugins = [
		// Makes some environment variables available to the JS code, for example:
		// if (process.env.NODE_ENV === 'production') { ... }. See `./env.js`.
		// It is absolutely essential that NODE_ENV was set to production here.
		// Otherwise React will be compiled in the very slow development mode.
		new webpack.DefinePlugin({
			'process.env': {
				...env.stringified['process.env'],
				LOCALE: JSON.stringify(locale),
				// MOMENT_LOCALE: JSON.stringify(MomentLocales[locale]),
			},
		}),
	]

	if (DsEnvironment.IsDeployed) {
		return {
			plugins: [
				...commonPlugins,

				// Lodash is stupid and you can't tree-shake their bundles properly without this
				new LodashModuleReplacementPlugin({
					// 'shorthands': true,
				}),

				//
				new MiniCssExtractPlugin({
					// Options similar to the same options in webpackOptions.output
					// both options are optional
					filename: 'static/css/[name].[contenthash:8].css',
					chunkFilename: 'static/css/[id].[contenthash:8].css',
				}),

				// ------------------------------------
				// Long Term Caching
				// ------------------------------------
				// More information https://medium.com/webpack/predictable-long-term-caching-with-webpack-d3eee1d3fa31
				// new webpack.NamedChunksPlugin(chunk => {
				// 	if (chunk.name) {
				// 		return chunk.name;
				// 	}

				// 	// eslint-disable-next-line no-underscore-dangle
				// 	return [...chunk._modules]
				// 		.map(m =>
				// 			path.relative(m.context, m.userRequest.substring(0, m.userRequest.lastIndexOf('.')))
				// 		)
				// 		.join('_');
				// }),

				//
				new webpack.HashedModuleIdsPlugin({
					// Options...
				}),

				// Generate a manifest file which contains a mapping of all asset filenames
				// to their corresponding output file so that tools can pick it up without
				// having to parse `index.html`.
				new ManifestPlugin({
					fileName: `manifests/${buildId}/asset-manifest.${locale}.json`,
					publicPath: '',
					// publicPath: publicPath,
					filter: obj => {
						const { name, path, isChunk, isInitial, isAsset, isModuleAsset } = obj
						// console.log({ name, path, isChunk, isInitial, isAsset, isModuleAsset });
						// console.log();
						return obj.isInitial
					},
					sort: (a, b) =>
						a.name.localeCompare(b.name, undefined, {
							numeric: true,
							sensitivity: 'base',
						}),
					seed: {
						name: `Member App Manifest - ${buildTime.toString()}`,
						buildTime: buildTime,
						buildId: buildId,
					},
				}),

				// NOTE - Only include moment locales that are relevant to the specific locale build
				//		Moment.js is an extremely popular library that bundles large locale files
				//		by default due to how Webpack interprets its code. This is a practical
				//		solution that requires the user to opt into importing specific locales.
				//		https://github.com/jmblog/how-to-optimize-momentjs-with-webpack
				// new webpack.ContextReplacementPlugin(
				// 	/moment[\/\\]locale$/,
				// 	new RegExp('(' + MomentLocales[locale] + ')$')
				// ),

				// Generate a service worker script that will precache, and keep up to date,
				// the HTML & assets that are part of the Webpack build.
				// new SWPrecacheWebpackPlugin({
				// 	// By default, a cache-busting query parameter is appended to requests
				// 	// used to populate the caches, to ensure the responses are fresh.
				// 	// If a URL is already hashed by Webpack, then there is no concern
				// 	// about it being stale, and the cache-busting can be skipped.
				// 	dontCacheBustUrlsMatching: /\.\w{8}\./,
				// 	filepath: `workers/${buildId}/`,
				// 	filename: `service-worker.${locale}.js`,
				// 	logger(message) {
				// 		if (message.indexOf('Total precache size is') === 0) {
				// 			// This message occurs for every build and is a bit too noisy.
				// 			return;
				// 		}
				// 		console.log(message);
				// 	},
				// 	minify: true,
				// 	// For unknown URLs, fallback to the index page
				// 	navigateFallback: publicUrl + '/',
				// 	// Ignores URLs starting from /__ (useful for Firebase):
				// 	// https://github.com/facebookincubator/create-react-app/issues/2237#issuecomment-302693219
				// 	navigateFallbackWhitelist: [/^(?!\/__).*/],
				// 	// Don't precache sourcemaps (they're large) and build asset manifest:
				// 	staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest$/],
				// 	// Work around Windows path issue in SWPrecacheWebpackPlugin:
				// 	// https://github.com/facebookincubator/create-react-app/issues/2235
				// 	stripPrefix: paths.appBuild.replace(/\\/g, '/') + '/',
				// }),
			],
		}
	}
	//
	else {
		return {
			plugins: [
				...commonPlugins,

				// Makes some environment variables available in index.html.
				// We don't really use this anymore but I'm keeping it around for now
				// new InterpolateHtmlPlugin(env.raw),

				// Generates an `index.html` file with the <script> injected.
				new HtmlWebpackPlugin({
					// inject: false,
					template: paths.appHtml,
					// chunks: ['bundle', 'main'],
				}),

				// This is necessary to emit hot updates (currently CSS only):
				new webpack.HotModuleReplacementPlugin(),

				// Watcher doesn't work well if you mistype casing in a path so we use
				// a plugin that prints an error when you attempt to do this.
				// See https://github.com/facebookincubator/create-react-app/issues/240
				new CaseSensitivePathsPlugin(),

				// Moment.js is an extremely popular library that bundles large locale files
				// by default due to how Webpack interprets its code. This is a practical
				// solution that requires the user to opt into importing specific locales.
				// https://github.com/jmblog/how-to-optimize-momentjs-with-webpack
				// You can remove this if you don't use Moment.js:
				new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
			],
		}
	}
}

// -------------------------------------------------------------------------------------------------
// PERFORMANCE
//
const performance = () => {
	return {
		performance: {
			// Let's see what kind of speed warnings we get for TeamA only
			hints: DsEnvironment.IsTeamA ? 'warning' : false,
		},
	}
}

// -------------------------------------------------------------------------------------------------
module.exports = {
	basics,
	entry,
	output,
	resolve,
	modules,
	plugins,
	optimization,
	performance,
}
