import { merge } from 'lodash-es'

import { PNG } from 'pngjs'

import { ALPHA_LEVEL, COLORS } from './constants.js'

import Debug from './utils/debug.js'

const debug = Debug('Encoder:')

const defaultOptions = {
  border: { size: 5 },
  pixel: { scale: 1.5 },
}

/**
 * @param {array} data -
 * @param {number} idx -
 * @param {array} rgb -
 */
const setPixelToColor = (data, idx, rgb) => {
  data[idx] = rgb[0]
  data[idx + 1] = rgb[1]
  data[idx + 2] = rgb[2]
  data[idx + 3] = ALPHA_LEVEL
}

/**
 * @param {string} data - Expects a base64 encoded string
 */
const encode = (data, EncoderHelper, options = {}) => {
  debug('encode: ...')

  options = merge(defaultOptions, options)

  const BORDER_SIZE = options.border.size
  // const PIXEL_SCALE = options.pixel.scale

  const side = Math.ceil(Math.sqrt(data.length))
  const sideWithFrame = side + BORDER_SIZE * 2
  const pixelsWithFrame = sideWithFrame * sideWithFrame

  // log
  debug(`encode: log... side: ${side}, sideWithFrame: ${sideWithFrame}, pixelsWithFrame: ${pixelsWithFrame}, dataLen: ${data.length}`)

  const png = new PNG({ width: sideWithFrame, height: sideWithFrame })

  const encoder = new EncoderHelper({ dataLen: data.length })

  for (let i = 0; i < pixelsWithFrame; i++) {
    const idx = i * 4
    const pixelIdx = idx >> 2
    const y = Math.floor(pixelIdx / sideWithFrame)
    const x = pixelIdx % sideWithFrame

    let rgb

    // draw border frame
    if (
      x < BORDER_SIZE ||
      x > sideWithFrame - BORDER_SIZE ||
      y < BORDER_SIZE ||
      y > sideWithFrame - BORDER_SIZE
    ) {
      rgb = COLORS.RED.split(',')

      setPixelToColor(png.data, idx, rgb)
      continue
    }

    // cover extra white space
    if (encoder.isComplete()) {
      rgb = COLORS.WHITE.split(',')

      setPixelToColor(png.data, idx, rgb)
      continue
    }

    // encode data to pixels
    const char = data[encoder.encodeIdx]

    rgb = encoder.getCharColorValue(char)

    setPixelToColor(png.data, idx, rgb)

    encoder.encodeIdx = encoder.encodeIdx + 1
  }

  const image = PNG.sync.write(png)

  return image
}

export { encode }
