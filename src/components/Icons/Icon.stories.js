import React from 'react'

// Storybook
import { storiesOf } from '@storybook/react'
import { select, boolean, text, object, number } from '@storybook/addon-knobs/react'

// Components
import Icon, { Name, Modifier, Backdrop } from './FontAwesome'

const nameOptions = Object.values(Name).sort()
const backdropOptions = Object.values(Backdrop)

const iconStyle = {
	fontSize: '5em',
	margin: '10px',
}

const iconListStyle = {
	border: '1px solid #ddd',
	display: 'inline-flex',
	flexDirection: 'column',
	alignItems: 'center',
	backgroundColor: '#fff',
	borderRadius: '10px',
	margin: '5px',
	padding: '5px',
	minWidth: '1em',
}

const getModifiers = () => {
	let mods = []
	if (boolean('fixed-width', true)) mods.push(Modifier.fixedWidth)
	if (boolean('spin', false)) mods.push(Modifier.spin)
	if (boolean('pulse', false)) mods.push(Modifier.pulse)
	return mods
}

storiesOf('Reference|Icons', module)
	.add('Single Icon', () => (
		<div style={iconListStyle}>
			<Icon
				name={select('name', nameOptions, nameOptions[0])}
				style={{
					...iconStyle,
					...(boolean('Show Spacing?', false) && { backgroundColor: '#c2ffb6' }),
				}}
				modifiers={getModifiers()}
				backdrop={select('backdrop', backdropOptions, Backdrop.none)}
				text={text('text')}
				count={number('count')}
			/>
		</div>
	))

	.add('Icon w/Counter', () => (
		<div>
			<p>Use this when you want to display things like notification counts.</p>
			<Icon
				name={select('name', nameOptions, Name.bell)}
				style={{
					...iconStyle,
					fontSize: `${number('fontSize', 5)}em`,
				}}
				count={number('count', 1)}
			/>
		</div>
	))

	.add('Icon w/Text', () => (
		<div>
			<p>Use this when you want to overlay some text on an icon (e.g. attachment icons).</p>
			<Icon
				name={select('name', nameOptions, Name.circle)}
				style={iconStyle}
				text={text('text', '+3')}
				transform={object('textTransform', {
					size: 9,
				})}
				bordered={boolean('bordered', false)}
			/>
		</div>
	))

	.add('All Imported Icons', () => {
		return (
			<div>
				{Object.keys(Name)
					.sort()
					.map(v => (
						<div key={v} style={iconListStyle}>
							<Icon
								name={Name[v]}
								style={iconStyle}
								modifiers={getModifiers()}
								backdrop={select('backdrop', backdropOptions, Backdrop.none)}
							/>
							<span>{v}</span>
						</div>
					))}
			</div>
		)
	})

/*
	ENTIRE FONTAWESOME LIBRARY!!!
		Not all of these are imported in the app.
		We're importing them here so we can see them all.
*/
import { icon } from '@fortawesome/fontawesome-svg-core'
import { fab as AllBrandIcons } from '@fortawesome/free-brands-svg-icons'
import { fal as AllLightIcons } from '@fortawesome/pro-light-svg-icons'
import { far as AllRegularIcons } from '@fortawesome/pro-regular-svg-icons'
import { fas as AllSolidIcons } from '@fortawesome/pro-solid-svg-icons'

const renderRawIcon = iconDef => {
	const ic = icon(iconDef, {
		classes: ['fa-fw'],
	})
	return (
		<span style={{ ...iconListStyle, overflow: 'hidden' }} key={ic.prefix + ic.iconName}>
			<span
				key={`${ic.prefix}${iconDef.iconName}`}
				style={{ ...iconStyle }}
				title={iconDef.iconName}
				dangerouslySetInnerHTML={{ __html: ic.html }}
			/>
			<span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
				{ic.iconName} ({ic.prefix})
			</span>
		</span>
	)
}

storiesOf('Reference|Icons', module).add('Entire FA Library', () => {
	return (
		<div>
			<h1>FontAwesome Library</h1>
			<p>
				Note: Not all of these are imported into the application. This is meant to help look at what
				is available in the package. Hover over icons for the icon name.
			</p>

			<p>
				You can also view these on the official Font Awesome website.{' '}
				<a href="https://fontawesome.com/icons">https://fontawesome.com/icons</a>
			</p>

			<h2>Solid</h2>
			<p>
				Developer: We treat these as "normal" instead of appending "Solid" to the end of their
				names.
			</p>
			{Object.keys(AllSolidIcons).map(k => renderRawIcon(AllSolidIcons[k]))}

			<h2>Regular (a.k.a. "Outline")</h2>
			{Object.keys(AllRegularIcons).map(k => renderRawIcon(AllRegularIcons[k]))}

			<h2>Light</h2>
			{Object.keys(AllLightIcons).map(k => renderRawIcon(AllLightIcons[k]))}

			<h2>Brands</h2>
			{Object.keys(AllBrandIcons).map(k => renderRawIcon(AllBrandIcons[k]))}
		</div>
	)
})
