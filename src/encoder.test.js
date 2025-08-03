import { Buffer } from 'node:buffer'

import { assert } from '@std/assert'

import EncoderBase64 from './encoder-base64.js'

import { encode } from './encoder.js'

const TEST_DIR = './tests/encoder'

Deno.test('Encoder [functional]', async (parent) => {
  await parent.step('when you create an instance:', async (parent) => {
    await parent.step('it should work', async () => {
      const input_path = `${TEST_DIR}/input/input-mock.zip`
      const output_path = `${TEST_DIR}/output/test-1-mock-`

      const data = await Deno.readFile(input_path)
      const base64Data = Buffer.from(data, 'utf8').toString('base64')

      assert(base64Data.length)

      const image = encode(base64Data, EncoderBase64)

      assert(image.length)

      await Deno.writeFile(`${output_path}image.png`, image, { create: true })
    })
  })
})
