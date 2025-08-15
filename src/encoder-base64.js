import merge from 'lodash-es/merge.js'

import ColorPalette from './color-palette/color-palette-fixed.js'

// import Debug from './utils/debug.js'
// const debug = Debug('EncoderBase64:')

const defaultOptions = {}

class EncoderBase64 {
  constructor(options = {}) {
    this.options = merge(defaultOptions, options)
    this.charMap = new Map()
    this.charIdx = 0

    this.encodeIdx = 0
    this.dataLen = this.options.dataLen
    this.complete = false

    this.createPalette()
    this.createLookupTable()
  }

  createPalette() {
    const colorPalette = new ColorPalette()

    this.palette = colorPalette.palette
  }

  createLookupTable() {
    const lower = 'a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z'
    const upper = lower.toUpperCase()
    const letters = [...lower.split(','), ...upper.split(',')]
    const numbers = Array.from({ length: 10 }, (_, i) => `${i}`)
    const symbols = ['/', '+', '=']

    letters.forEach((val) => {
      this.addChar(val)
    })

    numbers.forEach((val) => {
      this.addChar(val)
    })

    symbols.forEach((val) => {
      this.addChar(val)
    })
  }

  addChar(char) {
    this.charMap.set(char, this.palette[this.charIdx]) // .join(',')

    this.charIdx = this.charIdx + 1

    if (this.charIdx >= this.palette.length) {
      throw new Error('addChar: No more colors in palette...')
    }
  }

  // hasCharColorValue(char) {
  // }

  getCharColorValue(char) {
    if (!this.charMap.has(char)) {
      throw new Error('getCharColorValue: Failed to find color for character...' + char)
    }

    return this.charMap.get(char)
  }

  isComplete() {
    return this.encodeIdx >= this.dataLen
  }
}

export default EncoderBase64
