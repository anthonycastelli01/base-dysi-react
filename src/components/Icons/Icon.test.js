import React from 'react'
import TestRenderer from 'react-test-renderer'
import Icon, { Name, Modifier, Backdrop } from './FontAwesome'

describe('components/Icons', () => {
	test('Icon - Basic', () => {
		const name = Name.facebook
		const color = 'red'
		const title = 'Test Title'
		const modifiers = [Modifier.spin]
		const backdrop = Backdrop.square
		// const count = 2;

		const render = TestRenderer.create(
			<Icon
				name={name}
				modifiers={modifiers}
				backdrop={backdrop}
				style={{ color }}
				title={title}
				// count={count}
			/>
		).toJSON()

		// console.log(render.props.dangerouslySetInnerHTML);

		// Snapshot
		expect(render).toMatchSnapshot()

		// Icon
		expect(render.props.dangerouslySetInnerHTML['__html'][0]).toMatch(`data-icon="${Name.facebook}`)

		// Title
		expect(render.props.title).toBe(title)

		// Color
		expect(render.props.style).toMatchObject({ color: color })

		// Spin
		expect(render.props.dangerouslySetInnerHTML['__html'][0]).toMatch('fa-spin')

		// Backdrop
		expect(render.props.dangerouslySetInnerHTML['__html'][0]).toMatch('<mask')

		// Count
		// expect(render.props.dangerouslySetInnerHTML['__html'][0]).toMatch('fa-layers-text');
	})
})
