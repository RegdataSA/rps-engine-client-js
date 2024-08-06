export const prettifyPath = (path: any[]) => {
  if (path.length === 0) {
    return 'Root'
  }

  let message = 'Root'

  path.forEach((item) => {
    if (typeof item === 'number') {
      message += ` > ${item}`
    }
    else {
      message += ` > ${item}`
    }
  })

  return message
}

/**
 * Check if all inner properties are in the correct casing (recursive)
 */
const validateInnerDataCasing = (input: any, caseType: 'upper' | 'lower'): Array<{
  message: string
  path: string[]
}> => {
  const errors: any = []

  const checkCasing = (input: any, path: any[]) => {
    const keys = input ? Object.keys(input) : []

    keys.forEach((key) => {
      if (typeof input[key] === 'object') {
        checkCasing(input[key], [...path, key])
      }
      else {
        const isCorrectCasing = caseType === 'upper' ? key[0] === key[0].toUpperCase() : key[0] === key[0].toLowerCase()
        if (!isCorrectCasing) {
          errors.push({
            message: `The key "${key}" should start with ${caseType === 'upper' ? 'uppercase' : 'lowercase'} letter`,
            path: [...path, key],
          })
        }
      }
    })
  }

  checkCasing(input, [])

  return errors
}

/**
 * Check object properties casing (upper or lower).
 * Lowercase means JS, uppercase means С#
 *
 * @param input - the input object
 * @param rootProperties - the root properties that could be in the input object. Provide this for better error messages
 */
export const validateDataCasing = (input: any, rootProperties?: string[]): {
  isSharp: boolean
  isJs: boolean

  /**
   * Error message if the request provider is unknown
   */
  error: string | null
  innerErrors: Array<{
    message: string
    path: any[]
  }> | null
} => {
  const keys = Object.keys(input)

  const isAllCapitalStart = keys.every(key => key[0] === key[0].toUpperCase())
  const isAllLowerStart = keys.every(key => key[0] === key[0].toLowerCase())

  let error = null
  let innerErrors = null

  if (!isAllCapitalStart && !isAllLowerStart) {
    error = 'Wrong properties casing.'
    if (rootProperties) {
      error += ` All keys should start with lowercase letters (${rootProperties.join(', ')}) or uppercase letters (${rootProperties.map(p => p[0].toUpperCase() + p.slice(1)).join(', ')})`
    }
    else {
      error += ' All keys should start with lowercase letters or uppercase letters'
    }
  }
  else {
    const errors = validateInnerDataCasing (input, isAllCapitalStart ? 'upper' : 'lower')
    if (errors.length > 0) {
      innerErrors = errors
    }
  }

  return {
    isSharp: isAllCapitalStart,
    isJs: isAllLowerStart,
    error,
    innerErrors,
  }
}
