import { describe, expect, it } from 'vitest'

import * as It from '../src/index'

describe('should', () => {
  it('exported', () => {
    console.warn('It', It)
    expect(1).toEqual(1)
  })
})
