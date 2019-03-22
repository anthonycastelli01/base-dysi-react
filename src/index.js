import React, { Fragment, useContext } from 'react'
import PropTypes from 'prop-types'
import { render } from 'react-dom'

// Style
import { cssifyObject, assignStyle } from 'css-in-js-utils'
import tinycolor from 'tinycolor2'
import styleBase from './styles/base'
import 'normalize.css'

// Polyfills
import 'babel-polyfill'

// Components
import App from 'scenes/App/App'
import AppContext, { AppProvider } from 'scenes/App/AppContext'
import { AuthProvider } from 'scenes/App/AuthContext'
import { UserProvider } from 'scenes/App/UserContext'
import { utility } from '@dysi/js-helpers'

//#region Style
import { color } from '@dysi/style-helpers'
const dynamicStyle = appConfig => {
	// Apply Primary Color to base
	const primaryColor = utility.safeGetNestedProp(
		appConfig,
		'sphere.theme.primaryColor',
		color.primaryColor
	)

	// Override default primary color in base style sheet
	styleBase['a,a:hover,a:focus,a:active'] = assignStyle(styleBase['a,a:hover,a:focus,a:active'], {
		color: primaryColor,
	})

	styleBase['a:hover'] = assignStyle(styleBase['a:hover'], {
		color: tinycolor(primaryColor)
			.darken(10)
			.toString(),
	})

	styleBase.button = assignStyle(styleBase.button, {
		backgroundColor: primaryColor,
		borderColor: primaryColor,
	})

	// Convert base JS CSS to plain CSS
	let styleBaseCss = Object.keys(styleBase).reduce(
		(css, rule) => (css += `${rule} { ${cssifyObject(styleBase[rule])} } `),
		''
	)

	// Add media queries to converted CSS
	styleBaseCss += `
	@media (min-width: 1200px) and (max-width: 1340px) { .root-container { width: 1140px } }
	@media (min-width: 992px) and (max-width: 1199px) {	.root-container { width: 932px } }
	@media (min-width: 768px) and (max-width: 991px) { .root-container { width: 708px } }
	@media (max-width: 767px) { .root-container { width: 100%; box-sizing: border-box; } }`

	return styleBaseCss
}
////#endregion

// Wrap all the Context providers into a single component
const AllContexts = ({ children }) => {
	return (
		<AppProvider>
			<AuthProvider>
				<UserProvider>{children}</UserProvider>
			</AuthProvider>
		</AppProvider>
	)
}
AllContexts.propTypes = { children: PropTypes.any }

// Load everything
const Root = props => {
	const appConfig = useContext(AppContext)

	let styleBaseCss = dynamicStyle(appConfig)

	return (
		<Fragment>
			<style dangerouslySetInnerHTML={{ __html: styleBaseCss }} />
			<AllContexts>
				<App />
			</AllContexts>
		</Fragment>
	)
}

render(<Root />, document.getElementById('root'))
