import type { ValidatorResult } from 'jsonschema'

import type { IRpsJsonValidationItem, IRpsJsonValidationResult } from './types'

import { schemaValidator } from '../schema'
import { fingSimilarWords } from '../utils'

import { prettifyPath, validateDataCasing } from './validation-utils'

/**
 * Validates and transforms JSON input.
 * @param input - The JSON input to validate and transform.
 * @returns An object containing the validation result.
 */
export const validateTransformJson = (input: any): IRpsJsonValidationResult => {
  const keys = input ? Object.keys(input) : []

  if (keys.length === 0) {
    return {
      schemaResult: null,
      errors: [{
        message: 'Empty request data',
        prettyPath: 'Root',
        path: [],
      }],
      warns: [],
    }
  }

  const { isSharp, isJs, error, innerErrors } = validateDataCasing(input, ['rightContexts', 'processingContexts', 'requests'])

  if (error) {
    return {
      schemaResult: null,
      errors: [{
        message: error,
        prettyPath: 'Root',
        path: [],
      }],
      warns: [],
    }
  }
  else if (innerErrors) {
    return {
      schemaResult: null,
      errors: innerErrors.map(error => ({
        message: error.message,
        prettyPath: prettifyPath(error.path),
        path: error.path,
      })),
      warns: [],
    }
  }

  const customErrors: IRpsJsonValidationItem[] = []

  let schemaResult: ValidatorResult | null = null
  if (isSharp) {
    schemaResult = schemaValidator.validate(input, { $ref: '/RequestDataCSharp' })
  }
  else if (isJs) {
    schemaResult = schemaValidator.validate(input, { $ref: '/RequestData' })
  }
  else {
    throw new Error('Unknown request provider')
  }

  const errorsFromSchema: IRpsJsonValidationItem[] = []
  const warnsFromSchema: IRpsJsonValidationItem[] = []

  schemaResult.errors.forEach((error) => {
    const prettyPath = prettifyPath(error.path)

    if (error.name === 'additionalProperties') {
      const schema = typeof error.schema === 'string' ? schemaValidator.schemas[error.schema] : error.schema
      const propertiesKeys = schema.properties ? Object.keys(schema.properties) : []

      let message = `the property "${error.argument}" is not needed`

      const suggestionsForUnknownKey: string[] = fingSimilarWords(error.argument, propertiesKeys)
      if (suggestionsForUnknownKey.length) {
        message += `. Maybe you meant: ${suggestionsForUnknownKey.join(', ')}?`
      }

      warnsFromSchema.push({
        message,
        prettyPath,
        path: error.path,
      })
    }
    else {
      errorsFromSchema.push({
        message: error.message,
        prettyPath,
        path: error.path,
      })
    }
  })

  return {
    schemaResult,

    errors: [
      ...customErrors,
      ...errorsFromSchema,
    ],

    warns: [
      ...warnsFromSchema,
    ],
  }
}
