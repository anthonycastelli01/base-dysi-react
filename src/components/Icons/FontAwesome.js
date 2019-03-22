/**
 * IF YOU MODIFY THIS FILE OR ANY RELATED TO IT
 * PLEASE RUN THE TESTS BEFORE CHECKING IN YOUR CHANGES!
 */

import React from 'react'
import PropTypes from 'prop-types'

// Helpers
import { utility } from '@dysi/js-helpers'

// Styles
import tinycolor from 'tinycolor2'
import { font, color } from '@dysi/style-helpers'

// Root FontAwesome library
// import { icon, layer, text, counter } from '@fortawesome/fontawesome-svg-core'
import { icon, layer, text, counter } from './TEMP-fontawesome-svg-core'

// ----------------------------------------
// Icon sets
// ----------------------------------------
import BrandIcons from './Variations/FontAwesome.brands'
import RegularIcons from './Variations/FontAwesome.regular'
import LightIcons from './Variations/FontAwesome.light'
import SolidIcons from './Variations/FontAwesome.solid'

// ----------------------------------------
// Constants
// ----------------------------------------

// Icon modifiers
export const Modifier = {
	fixedWidth: 'fixedWidth',
	spin: 'spin',
	pulse: 'pulse',
}
const ModifierMapping = {
	fixedWidth: 'fa-fw',
	spin: 'fa-spin',
	pulse: 'fa-pulse',
}

// Icon Backdrops
export const Backdrop = {
	none: '',
	square: 'square',
	circle: 'circle',
}
export const BackdropMapping = {
	square: SolidIcons.faSquare,
	circle: SolidIcons.faCircle,
}

// Dev-friendly icon names
// - Keep these sorted alphabetically by grouping
export const Name = {
	// Light
	timesLight: 'timesLight',
	// Regular
	calendar: 'calendar',
	circleOutline: 'circleOutline',
	commentOutline: 'commentOutline',
	ellipsisV: 'ellipsisV',
	exclamationSquare: 'exclamationSquare',
	heartOutline: 'heartOutline',
	replyOutline: 'replyOutline',
	retweetOutline: 'retweetOutline',
	shareOutline: 'shareOutline',
	thumbsUpOutline: 'thumbsUpOutline',
	times: 'times',
	// Solid
	angleLeft: 'angleLeft',
	angleRight: 'angleRight',
	bars: 'bars',
	bell: 'bell',
	bomb: 'bomb',
	bullhorn: 'bullhorn',
	camera: 'camera',
	capsLock: 'capsLock',
	caretDown: 'caretDown',
	caretUp: 'caretUp',
	check: 'check',
	chevronDown: 'chevronDown',
	chevronLeft: 'chevronLeft',
	chevronRight: 'chevronRight',
	chevronUp: 'chevronUp',
	circle: 'circle',
	circleNotch: 'circleNotch',
	clipboard: 'clipboard',
	clock: 'clock',
	cog: 'cog',
	comment: 'comment',
	comments: 'comments',
	compress: 'compress',
	exclamation: 'exclamation',
	exclamationCircle: 'exclamationCircle',
	expand: 'expand',
	file: 'file',
	frown: 'frown',
	heart: 'heart',
	globe: 'globe',
	globeAmericas: 'globeAmericas',
	home: 'home',
	image: 'image',
	link: 'link',
	lock: 'lock',
	longArrowDown: 'longArrowDown',
	longArrowUp: 'longArrowUp',
	phone: 'phone',
	pencilAlt: 'pencilAlt',
	play: 'play',
	plus: 'plus',
	reply: 'reply',
	retweet: 'retweet',
	search: 'search',
	spinner: 'spinner',
	square: 'square',
	star: 'star',
	sync: 'sync',
	thumbsUp: 'thumbsUp',
	thumbtack: 'thumbtack',
	trashAlt: 'trashAlt',
	tvRetro: 'tvRetro',
	userCircle: 'userCircle',
	share: 'share',
	// urgent: 'urgent',
	video: 'video',
	// brands
	apple: 'apple',
	android: 'android',
	// chatter: 'chatter',
	// dysi: 'dysi',
	// Social Providers
	blog: 'blog', // Social Icon pseudo-provider
	blogger: 'blogger',
	cutandpaste: 'cutandpaste',
	email: 'email',
	facebook: 'facebook',
	facebookpage: 'facebookpage',
	instagram: 'instagram',
	// jive: 'jive',
	linkedin: 'linkedin',
	linkedinpage: 'linkedinpage',
	rss: 'rss',
	// sapjam: 'sapjam',
	tencent: 'tencent',
	tumblr: 'tumblr',
	twitter: 'twitter',
	weibo: 'weibo',
	wordpress: 'wordpress',
	xing: 'xing',
	youtube: 'youtube',
}

// Friendly-name to Icon mapping
//   This is only exported to make testing easier!
export const IconMapping = {
	// Light
	[Name.timesLight]: LightIcons.faTimes,
	// Outline
	[Name.calendar]: RegularIcons.faCalendarAlt,
	[Name.circleOutline]: RegularIcons.faCircle,
	[Name.commentOutline]: RegularIcons.faComment,
	[Name.ellipsisV]: RegularIcons.faEllipsisV,
	[Name.exclamationSquare]: RegularIcons.faExclamationSquare,
	[Name.heartOutline]: RegularIcons.faHeart,
	[Name.globeAmericas]: RegularIcons.faGlobeAmericas,
	[Name.replyOutline]: RegularIcons.faReply,
	[Name.retweetOutline]: RegularIcons.faRetweet,
	[Name.shareOutline]: RegularIcons.faShare,
	[Name.thumbsUpOutline]: RegularIcons.faThumbsUp,
	[Name.times]: RegularIcons.faTimes,
	// Solid
	[Name.angleLeft]: SolidIcons.faAngleLeft,
	[Name.angleRight]: SolidIcons.faAngleRight,
	[Name.bars]: SolidIcons.faBars,
	[Name.bell]: SolidIcons.faBell,
	[Name.bomb]: SolidIcons.faBomb,
	[Name.bullhorn]: SolidIcons.faBullhorn,
	[Name.camera]: SolidIcons.faCamera,
	[Name.capsLock]: SolidIcons.faArrowAltFromBottom,
	[Name.caretDown]: SolidIcons.faCaretDown,
	[Name.caretUp]: SolidIcons.faCaretUp,
	[Name.check]: SolidIcons.faCheck,
	[Name.chevronDown]: SolidIcons.faChevronDown,
	[Name.chevronLeft]: SolidIcons.faChevronLeft,
	[Name.chevronRight]: SolidIcons.faChevronRight,
	[Name.chevronUp]: SolidIcons.faChevronUp,
	[Name.circle]: SolidIcons.faCircle,
	[Name.circleNotch]: SolidIcons.faCircleNotch,
	[Name.clipboard]: SolidIcons.faClipboardList,
	[Name.clock]: SolidIcons.faClock,
	[Name.cog]: SolidIcons.faCog,
	[Name.comment]: SolidIcons.faComment,
	[Name.comments]: SolidIcons.faComments,
	[Name.compress]: SolidIcons.faCompressAlt,
	[Name.exclamation]: SolidIcons.faExclamation,
	[Name.exclamationCircle]: SolidIcons.faExclamationCircle,
	[Name.expand]: SolidIcons.faExpandAlt,
	[Name.file]: SolidIcons.faFile,
	[Name.frown]: RegularIcons.faFrown,
	[Name.heart]: SolidIcons.faHeart,
	[Name.globe]: SolidIcons.faGlobe,
	[Name.home]: SolidIcons.faHome,
	[Name.image]: SolidIcons.faImage,
	[Name.link]: SolidIcons.faLink,
	[Name.lock]: SolidIcons.faLock,
	[Name.longArrowDown]: SolidIcons.faLongArrowDown,
	[Name.longArrowUp]: SolidIcons.faLongArrowUp,
	[Name.pencilAlt]: SolidIcons.faPencilAlt,
	[Name.play]: SolidIcons.faPlay,
	[Name.plus]: SolidIcons.faPlus,
	[Name.phone]: SolidIcons.faPhone,
	[Name.reply]: SolidIcons.faReply,
	[Name.retweet]: SolidIcons.faRetweet,
	[Name.search]: SolidIcons.faSearch,
	[Name.share]: SolidIcons.faShare,
	[Name.spinner]: SolidIcons.faSpinner,
	[Name.square]: SolidIcons.faSquare,
	[Name.star]: SolidIcons.faStar,
	[Name.sync]: SolidIcons.faSyncAlt,
	[Name.thumbsUp]: SolidIcons.faThumbsUp,
	[Name.thumbtack]: SolidIcons.faThumbtack,
	[Name.trashAlt]: SolidIcons.faTrashAlt,
	[Name.tvRetro]: SolidIcons.faTvRetro,
	[Name.userCircle]: SolidIcons.faUserCircle,
	// [Name.urgent]: SolidIcons.faUrgent,
	[Name.video]: SolidIcons.faVideo,
	// Brands
	[Name.apple]: BrandIcons.faApple,
	[Name.android]: BrandIcons.faAndroid,
	// [Name.chatter]: BrandIcons.faChatter,
	// [Name.dysi]: BrandIcons.faDySi,
	// Social Providers
	[Name.blog]: SolidIcons.faRss,
	[Name.cutandpaste]: SolidIcons.faLink,
	[Name.email]: SolidIcons.faEnvelope,
	[Name.facebook]: BrandIcons.faFacebookF,
	[Name.facebookpage]: BrandIcons.faFacebookF,
	[Name.twitter]: BrandIcons.faTwitter,
	[Name.blogger]: BrandIcons.faBloggerB,
	[Name.instagram]: BrandIcons.faInstagram,
	// [Name.jive]: BrandIcons.faJive,
	[Name.linkedin]: BrandIcons.faLinkedinIn,
	[Name.linkedinpage]: BrandIcons.faLinkedinIn,
	[Name.rss]: SolidIcons.faRss,
	// [Name.sapjam]: BrandIcons.faSapJam,
	[Name.tencent]: BrandIcons.faTencentWeibo,
	[Name.tumblr]: BrandIcons.faTumblr,
	[Name.weibo]: BrandIcons.faWeibo,
	[Name.wordpress]: BrandIcons.faWordpressSimple,
	[Name.xing]: BrandIcons.faXing,
	[Name.youtube]: BrandIcons.faYoutube,
}

const getBackdropOptions = backdrop => {
	if (!backdrop) return {}

	return {
		mask: BackdropMapping[backdrop],
		transform: {
			size: 10,
		},
	}
}

// Functional component
class FontAwesomeIcon extends React.Component {
	static propTypes = {
		name: PropTypes.oneOf(Object.values(Name)).isRequired,
		backdrop: PropTypes.oneOf(Object.values(Backdrop)),
		modifiers: PropTypes.array,
		text: PropTypes.string,
		count: PropTypes.number,
		transform: PropTypes.object,
		style: PropTypes.any,
		bordered: PropTypes.bool,
	}

	static defaultProps = {
		backdrop: Backdrop.none,
		modifiers: [],
		bordered: false,
	}

	render() {
		// props to not apply to the outer span
		const {
			name,
			modifiers,
			backdrop,
			text: txt,
			count,
			transform = {},
			bordered,
			...rest
		} = this.props

		// props to apply to the outer span
		const { style } = this.props

		const iconVariable = IconMapping[name]

		const iconMods = modifiers.reduce((memo, mod) => {
			const validMod = ModifierMapping[mod]
			if (validMod) memo.push(validMod)
			return memo
		}, [])

		let ic

		// Icons with text
		if (txt) {
			// Grab the background color so we can display light or dark text on it
			const backgroundColor = tinycolor(
				utility.safeGetNestedProp(style, 'color') || color.primaryBlack
			)
			const isBackgroundColorLight = backgroundColor.isLight()

			// Build the text icon layer by layer
			ic = layer(push => {
				if (bordered) {
					push(
						icon(SolidIcons.faCircle, {
							styles: {
								color: `${color.primaryGrey}`,
							},
							transform: {
								size: 17,
							},
						})
					)
				}
				// Base icon first
				push(
					icon(iconVariable, {
						classes: iconMods,
						...getBackdropOptions(backdrop),
					})
				)
				// Layer the text on top
				push(
					text(txt, {
						styles: {
							color: `${isBackgroundColorLight ? color.primaryBlack : color.white}`,
							'font-weight': `${font.weight.semiBold}`,
						},
						transform: transform,
					})
				)
			}).html
		}
		// Icons with a count badge
		else if (count) {
			const displayCount = count > 99 ? '99+' : count
			ic = layer(push => {
				// Base icon first
				push(icon(iconVariable))
				// Layer the count on top
				push(
					counter(displayCount, {
						styles: {
							'background-color': `${color.secondaryRed}`,
							'font-size': '1.75em',
							'font-weight': `${font.weight.semiBold}`,
							position: 'absolute',
							top: '-25%',
							right: '-25%',
							'-webkit-transform': 'scale(0.3)',
							transform: 'scale(0.3)',
							'-webkit-transform-origin': 'top right',
							'transform-origin': 'top right',
							'line-height': 0.95,
						},
					})
				)
			}).html
		}
		// All other icons
		else {
			ic = icon(iconVariable, {
				classes: iconMods,
				transform: transform,
				...getBackdropOptions(backdrop),
			}).html
		}

		const iconStyle = {
			// We do this so that the icon doesn't hijack the clicks
			pointerEvents: 'none',
			...this.props.style,
		}

		return <span {...rest} style={iconStyle} dangerouslySetInnerHTML={{ __html: ic }} />
	}
}

export default FontAwesomeIcon
