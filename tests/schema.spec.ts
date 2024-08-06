import { describe, expect, it } from 'vitest'

import {
  schemaValidator,
} from '../src/schema/index'

import { requestJSON, requestJSONSharp } from './data'

describe('schemaValidator', () => {
  it('js', () => {
    const res = schemaValidator.validate(requestJSON, {
      $ref: '/RequestData',
    })

    expect(res.valid).toEqual(true)
  })

  it('c#', () => {
    const res = schemaValidator.validate(requestJSONSharp, {
      $ref: '/RequestDataCSharp',
    })

    expect(res.valid).toEqual(true)
  })
})
