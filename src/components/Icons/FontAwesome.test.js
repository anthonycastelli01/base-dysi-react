import BrandIcons from './Variations/FontAwesome.brands'
import RegularIcons from './Variations/FontAwesome.regular'
import LightIcons from './Variations/FontAwesome.light'
import SolidIcons from './Variations/FontAwesome.solid'

import { Name, IconMapping } from './FontAwesome'

const mappingValues = Object.values(IconMapping)
const mappingKeys = Object.keys(IconMapping)

test('All imported Brand icons are mapped in IconMapping', () => {
	Object.keys(BrandIcons).forEach(key => {
		expect(mappingValues).toContain(BrandIcons[key])
	})
})

test('All imported Solid icons are mapped in IconMapping', () => {
	Object.keys(SolidIcons).forEach(key => {
		expect(mappingValues).toContain(SolidIcons[key])
	})
})

test('All imported Regular icons are mapped in IconMapping', () => {
	Object.keys(RegularIcons).forEach(key => {
		expect(mappingValues).toContain(RegularIcons[key])
	})
})

test('All imported Light icons are mapped in IconMapping', () => {
	Object.keys(LightIcons).forEach(key => {
		expect(mappingValues).toContain(LightIcons[key])
	})
})

test('FontAwesome.Name constant keys match values', () => {
	Object.keys(Name).forEach(key => {
		expect(key).toBe(Name[key])
	})
})

test('FontAwesome.Name constant values exist in IconMapping', () => {
	Object.values(Name).forEach(val => {
		expect(mappingKeys).toContain(val)
	})
})
