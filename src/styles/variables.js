import { form as dysiForm, spacing, border, color, font } from '@dysi/style-helpers'

// --------------------------------------
// FORM
// --------------------------------------
export const form = {
	...dysiForm,
	group: {
		marginBottom: spacing.basic,
	},
	errorField: {
		border: border.error,
	},
	errorText: {
		color: color.textError,
		lineHeight: font.lineHeight.base,
		marginTop: 4,
	},
	errorBlock: {
		color: color.textError,
		background: color.bgError,
		padding: spacing.basic,
		marginTop: 0,
		marginBottom: 15,
		marginLeft: 0,
		marginRight: 0,
	},
}

// --------------------------------------
// BUTTON
// --------------------------------------
export const button = {
	fullWidth: {
		width: '100%',
	},
}
