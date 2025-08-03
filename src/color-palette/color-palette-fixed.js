import { merge } from 'lodash-es'

import { COLORS } from '../constants.js'

// import Debug from './utils/debug.js'

// const debug = Debug('ColorPalette:')

const COLOR_PALETTE = new Set([
  '230,25,75',
  '60,180,75',
  '255,225,25',
  '67,99,216',
  '245,130,48',
  '145,30,180',
  '70,240,240',
  '240,50,230',
  '188,246,12',
  '250,190,190',
  '0,128,128',
  '230,190,255',
  '154,99,36',
  '255,250,200',
  '128,0,0',
  '170,255,195',
  '128,128,0',
  '255,216,177',
  '0,0,117',
  '128,128,128',
  '255,255,255',
  '0,0,0',
  '255,127,0',
  '55,126,184',
  '77,175,74',
  '152,78,163',
  '255,220,0',
  '166,86,40',
  '247,129,191',
  '153,153,153',
  '102,194,165',
  '252,141,98',
  '141,160,203',
  '231,138,195',
  '166,216,84',
  '255,217,47',
  '229,196,148',
  '179,179,179',
  '27,158,119',
  '217,95,2',
  '117,112,179',
  '231,41,138',
  '102,166,30',
  '230,171,2',
  '166,118,29',
  '102,102,102',
  '255,0,0',
  '0,255,0',
  '0,0,255',
  '255,255,0',
  '0,255,255',
  '255,0,255',
  '128,0,128',
  '0,128,0',
  '128,128,0',
  '128,0,0',
  '0,128,128',
  '192,192,192',
  '255,165,0',
  '64,224,208',
  '255,20,147',
  '127,255,0',
  '220,20,60',
  '0,206,209',
  '218,112,214',
  '240,230,140',
  '173,216,230',
  '255,182,193',
  '144,238,144',
  '255,99,71',
])

const defaultOptions = {
  reserved: new Set([COLORS.RED, COLORS.WHITE, COLORS.BLACK]),
  step: 100, // 40
  limit: 70,
  max: 256,
}

class ColorPalette {
  constructor(options) {
    this.options = merge(defaultOptions, options)

    const palette = []
    const reserved = this.options.reserved

    COLOR_PALETTE.forEach((color) => {
      const rgb = color.split(',').map((val) => Number.parseInt(val))

      if (!reserved.has(color)) {
        palette.push(rgb)
      }
    })

    const max = this.options.max
    const step = this.options.step
    const limit = this.options.limit

    let abort = false

    for (let r = 0; r < max; r += step) {
      if (abort) break

      for (let g = 0; g < max; g += step) {
        if (abort) break

        for (let b = 0; b < max; b += step) {
          if (abort) break

          const color = `${r},${g},${b}`

          if (!reserved.has(color) && !COLOR_PALETTE.has(color)) {
            palette.push([r, g, b])
          }

          if (palette.length >= limit) {
            abort = true
          }
        }
      }
    }

    this.palette = palette
  }
}

export default ColorPalette
