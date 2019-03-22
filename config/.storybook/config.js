/* eslint-disable import/no-extraneous-dependencies, import/no-unresolved, import/extensions */

import { configure, addParameters, addDecorator } from '@storybook/react'
import React from 'react'

const styles = {
	bottomLink: {
		color: 'red',
		fontWeight: 'bold',
		position: 'absolute',
		bottom: 0,
		right: 0,
		paddingRight: 5,
		paddingLeft: 5,
		paddingBottom: 2.5,
		paddingTop: 2.5,
		backgroundColor: 'white',
		border: 'thin solid red',
	},
}

addDecorator((storyFunc, { kind, story }) => {
	return (
		<div>
			{storyFunc()}
			<a href={`/?selectedKind=${kind}&selectedStory=${story}`} style={styles.bottomLink}>
				Link to this Story...
			</a>
		</div>
	)
})

// Global options
import { create, themes } from '@storybook/theming'
addParameters({
	options: {
		theme: create({
			base: themes.light.base,
			brandTitle: 'Micaela ❤️ Anthony',
			brandUrl: '/',

			// Is this a 'light' or 'dark' theme?
			// base: 'light',

			// Color palette
			// colorPrimary: 'red', // primary color
			// colorSecondary: 'pink', // secondary color

			// UI
			// appBg: 'papayawhip',
			// appContentBg: 'white',
			// appBorderColor: 'rgba(0,0,0,.1)',
			// appBorderRadius: 4,

			// Fonts
			// fontBase: '"Helvetica", Arial, sans-serif',
			// fontCode: 'Monaco, monospace',

			// Text colors
			// textColor: '#FFFFFF',
			// textInverseColor: '#333333',

			// Toolbar default and active colors
			// barTextColor: '#999999',
			// barSelectedColor: 'blue',
			// barBg: 'white',

			// Form colors
			// inputBg: 'white',
			// inputBorder: 'rgba(0,0,0,.1)',
			// inputTextColor: '#333333',
			// inputBorderRadius: 4,
		}),
		isFullscreen: false,
		panelPosition: 'right',
		showNav: true,
		showPanel: true,
	},
})

// Global knobs
import { withKnobs } from '@storybook/addon-knobs'
addDecorator(withKnobs)

// Load all the stories using the *.stories.js extension
function loadStories() {
	// Load the StyleGuide stories first because they're special
	// require('../../src/helpers/storybook/StorybookWelcome')
	// require('../../src/styles/stories/StyleGuideStories')

	// Documentation stories
	// const docs = require.context('../../docs', true, /(stories\.js$)/)
	// docs.keys().forEach(filename => docs(filename))

	// Regular stories
	const req = require.context('../../src', true, /(stories\.js$)/)
	req.keys().forEach(filename => req(filename))
}

configure(loadStories, module)
