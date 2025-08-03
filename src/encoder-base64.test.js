import { assert } from '@std/assert'

import EncoderBase64 from './encoder-base64.js'

Deno.test('EncoderBase64 [functional]', (parent) => {
  parent.step('when you create an instance:', (parent) => {
    parent.step('it should work', () => {
      const instance = new EncoderBase64()

      // console.log('log: charMap:', instance.charMap)

      assert(typeof instance !== 'undefined')
      assert(typeof instance.charMap !== 'undefined')
      assert(instance.charMap.size)
    })
  })
})
