import { describe, expect, it } from 'vitest'

import {
  validateTransformJson,
} from './validation'

describe('Validation TransformJSON', () => {
  it('Valid', () => {
    const res = validateTransformJson({
      rightsContexts: [
        {
          guid: '5e084dc7-91ed-4803-b72b-249871f7debf',
          evidences: [
            {
              name: 'Role',
              value: 'Admin',
            },
          ],
        },
      ],
      processingContexts: [
        {
          guid: 'ffc6fc02-17d3-4e5c-95a5-234b35662169',
          evidences: [
            {
              name: 'Action',
              value: 'Protect',
            },
          ],
        },
      ],
      requests: [
        {
          guid: 'b0cf56d2-c330-4890-ac11-307805279c19',
          rightsContext: '5e084dc7-91ed-4803-b72b-249871f7debf',
          processingContext: 'ffc6fc02-17d3-4e5c-95a5-234b35662169',
          instances: [
            {
              className: 'User',
              propertyName: 'FirstName',
              value: 'Jonny',
            },
            {
              value: 'SomeValue',
            },
          ],
        },
      ],
    })

    expect(res.errors.length).toBe(0)
    expect(res.warns.length).toBe(0)
  })

  it('Invalid', () => {
    const res = validateTransformJson({
      rightsContexts: [
        {
          guid: '5e084dc7-91ed-4803-b72b-249871f7debf',
          evidences: [
            {
              name: 'Role',
              value: 'Admin',
            },
          ],
        },
      ],
      processingContexts: [
        {
          guid: 'ffc6fc02-17d3-4e5c-95a5-234b35662169',
          evidences2: [
            {
              name: 'Action',
              value: 'Protect',
            },
          ],
        },
      ],
      requests: [
        {
          guid: 'b0cf56d2-c330-4890-ac11-307805279c19',
          rightsContext: '5e084dc7-91ed-4803-b72b-249871f7debf',
          processingContext: 'ffc6fc02-17d3-4e5c-95a5-234b35662169',
          instances: [
            {
              className2: 'User',
              propertyName: 'FirstName',
              value: 'Jonny',
            },
            {
              value: undefined,
            },
          ],
        },
      ],
    })

    expect(res.errors.findIndex(e => e.message === 'requires property "evidences"')).not.toBe(-1)
    expect(res.errors.findIndex(e => e.message === 'requires property "value"')).not.toBe(-1)

    expect(res.warns.findIndex(e => e.message === 'the property "evidences2" is not needed. Maybe you meant: evidences?')).not.toBe(-1)
    expect(res.warns.findIndex(e => e.message === 'the property "className2" is not needed. Maybe you meant: className?')).not.toBe(-1)
  })
})
