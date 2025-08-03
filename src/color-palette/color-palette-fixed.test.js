import { assert } from '@std/assert'

import ColorPalette from './color-palette-fixed.js'

Deno.test('ColorPalette [functional]', (parent) => {
  parent.step('when you create an instance:', (parent) => {
    parent.step('it should work', () => {
      const colorPalette = new ColorPalette()

      // console.log(palette)
      assert(typeof colorPalette !== 'undefined')
      assert(colorPalette.palette)
      assert(colorPalette.palette.length)
    })
  })
})
