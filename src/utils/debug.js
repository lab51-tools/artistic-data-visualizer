// NOTE: deno variant to fix --allow-env
import { debug } from 'https://deno.land/x/debug/mod.ts'

export default (name) => {
  return debug(`Art-Data-Viz::${name}`)
}
