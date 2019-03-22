import { border, color, font, spacing, misc } from '@dysi/style-helpers'

/* *************************************************************************** *
	NOTE: Sizes in this file are specified as strings, not numbers, because
		  index.js uses cssifyObject to turn this style object into CSS and
		  it ain't too smart about number sizes.
 * *************************************************************************** */

const textbox = {
	display: 'inline-block',
	width: '100%',
	height: misc.form.input.height + 'px',
	minHeight: misc.form.input.height + 'px',
	fontSize: font.size.base + 'px',
	color: color.primaryBlack,
	lineHeight: font.input,
	borderTop: 'none',
	borderBottom: border.basic,
	borderLeft: 'none',
	borderRight: 'none',
	borderRadius: border.radius,
	boxShadow: 'none',
	paddingTop: 0,
	paddingBottom: 0,
	paddingLeft: 0,
	paddingRight: 0,
	marginTop: 0,
	marginBottom: 0,
	marginLeft: 0,
	marginRight: 0,
}

const styleBase = {
	'*': {
		flexShrink: 1,
	},
	html: {
		overflowX: 'hidden', // Just in case
		overflowY: 'hidden',
	},
	body: {
		height: '100vh',
		fontFamily: font.family.base,
		fontSize: font.size.base + 'px',
		fontWeight: font.weight.normal,
		lineHeight: font.base,
		color: color.primaryGrey,
		marginTop: 0,
		marginBottom: 0,
		marginRight: 0,
		marginLeft: 0,
		padding: 0,
	},
	// This is necessary because the default style provider doesn't vendor prefix sticky positioning
	'.sticky': {
		position: ['sticky', '-webkit-sticky', '-moz-sticky', '-ms-sticky', '-o-sticky'],
	},
	'h1, h2, h3, h4, h5, h6': {
		color: color.primaryBlack,
	},
	h1: {
		fontSize: font.size.jumbo + 'px',
		lineHeight: font.lineHeight.jumbo,
		fontWeight: font.weight.light,
	},
	h2: {
		fontSize: font.size.title + 'px',
		fontWeight: font.weight.light,
	},
	h3: {
		fontSize: font.size.heading + 'px',
		fontWeight: font.weight.semiBold,
	},
	h4: {
		fontSize: font.size.heading + 'px',
	},
	h5: {
		fontSize: font.size.small + 'px',
		textTransform: 'uppercase' /* ALL CAPS */,
	},
	'a,a:hover,a:focus,a:active': { color: color.primaryBlack },
	a: {
		fontSize: 'inherit',
		textDecoration: 'none',
	},
	'a:hover': { textDecoration: 'none' },
	'a *:hover': { textDecoration: 'none' }, // Icons should not underline
	'input[type=text], input[type=email], input[type=password], input[type=url]': { ...textbox },
	'input[type=text]:focus, input[type=email]:focus, input[type=password]:focus, input[type=url]:focus': {
		...textbox,
	},
	'input[type=number]::-webkit-inner-spin-button,input[type=number]::-webkit-outer-spin-button': {
		'-webkit-appearance': 'none',
		margin: 0,
	},
	'input::placeholder': {
		color: color.textPlaceholder,
	},
	'textarea::placeholder': {
		color: color.textPlaceholder,
	},
	'input::-webkit-input-placeholder': {
		color: color.textPlaceholder,
	},
	'input:-moz-placeholder': {
		/* Firefox 18- */
		color: color.textPlaceholder,
	},
	'input::-moz-placeholder': {
		/* Firefox 19+ */
		color: color.textPlaceholder,
	},
	'input:-ms-input-placeholder': {
		color: color.textPlaceholder,
	},
	'textarea::-webkit-input-placeholder': {
		color: color.textPlaceholder,
	},
	'textarea:-moz-placeholder': {
		/* Firefox 18- */
		color: color.textPlaceholder,
	},
	'textarea::-moz-placeholder': {
		/* Firefox 19+ */
		color: color.textPlaceholder,
	},
	'textarea:-ms-input-placeholder': {
		color: color.textPlaceholder,
	},
	'.public-DraftEditorPlaceholder-root': {
		/* DraftJS text placeholder */
		color: color.textPlaceholder,
	},
	'form input': {
		display: 'block',
	},
	'form .button-row': {
		textAlign: 'right',
	},
	'.help-block': {
		display: 'block',
	},
	small: {
		fontSize: font.size.small + 'px',
	},
	'small.gray': {
		color: color.primaryGrey,
	},
	'small.help': {
		color: color.textHelp,
	},
	'small.light': {
		fontWeight: font.weight.light,
	},
	'*.disabled': {
		color: color.textDisabled,
	},
	'*[disabled]': {
		color: color.textDisabled,
	},
	'button[disabled]': {
		color: '#e8e8e8',
		cursor: 'default',
	},
	p: {
		marginTop: spacing.basic + 'px',
		marginBottom: spacing.basic + 'px',
	},

	// Button
	button: {
		display: 'inline-block',
		color: color.white,
		backgroundImage: 'none',
		backgroundColor: color.defaultPrimaryColor,
		borderColor: color.defaultPrimaryColor,
		fontSize: font.size.base + 'px',
		fontWeight: font.weight.normal + 'px',
		lineHeight: font.base,
		userSelect: 'none',
		'-webkit-user-select': 'none',
		'-moz-user-select': 'none',
		'-ms-user-select': 'none',
		borderRadius: 0,
		textAlign: 'center',
		verticalAlign: 'middle',
		whiteSpace: 'nowrap',
		overflow: 'visible',
		cursor: 'pointer',
		webkitAppearance: 'button',
		textTransform: 'none',
		border: '1px solid transparent',
		paddingTop: '6px',
		paddingRight: '15px',
		paddingBottom: '6px',
		paddingLeft: '15px',
		margin: 0,
	},
	'button:active': {
		backgroundImage: 'none',
		outline: 0,
		'-webkit-box-shadow': 'inset 0 3px 5px rgba(0, 0, 0, .125)',
		boxShadow: 'inset 0 3px 5px rgba(0, 0, 0, .125)',
	},
	'button:hover,button:focus': {
		textDecoration: 'none',
	},

	// Text Area
	textarea: {
		resize: 'none',
	},

	// IE fixes TA-17800
	'@-ms-viewport': {
		width: 'auto !important',
	},

	// Layout
	'.root-container': {
		width: '1280px',
		maxWidth: '100%',
		paddingTop: '0',
		paddingBottom: '0',
		paddingRight: '15px',
		paddingLeft: '15px',
		marginTop: '15px',
		marginBottom: '15px',
		marginRight: 'auto',
		marginLeft: 'auto',
	},
}

export default styleBase
