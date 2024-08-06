/**
 * Measuring the difference between two strings.
 * Could be useful for fuzzy search or suggestions based on user input.
 *
 * https://en.wikipedia.org/wiki/Levenshtein_distance
 * https://en.wikibooks.org/wiki/Algorithm_Implementation/Strings/Levenshtein_distance#JavaScript
 */
export const getWordDistance = (word1: string, word2: string): number => {
  if (word1.length === 0) return word2.length
  if (word2.length === 0) return word1.length

  const matrix = []

  // increment along the first column of each row
  let i
  for (i = 0; i <= word2.length; i++) {
    matrix[i] = [i]
  }

  // increment each column in the first row
  let j
  for (j = 0; j <= word1.length; j++) {
    matrix[0][j] = j
  }

  // Fill in the rest of the matrix
  for (i = 1; i <= word2.length; i++) {
    for (j = 1; j <= word1.length; j++) {
      if (word2.charAt(i - 1) == word1.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1]
      }
      else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitution
          Math.min(
            matrix[i][j - 1] + 1, // insertion
            matrix[i - 1][j] + 1,
          ),
        ) // deletion
      }
    }
  }

  return matrix[word2.length][word1.length]
}

/**
 * Find similar words based on the edit distance.
 * @param maxDistance - the maximum distance between the words to be considered similar
 * @returns
 */
export const fingSimilarWords = (word: string, words: string[], maxDistance: number = 2): string[] => {
  const similar: string[] = []

  words.forEach((w) => {
    const distance = getWordDistance(w, word)
    if (distance <= maxDistance) {
      similar.push(w)
    }
  })

  return similar
}

export const isObject = (object: any) => object != null && typeof object === 'object'

export const deepEqual = (object1: any, object2: any): boolean => {
  const keys1 = Object.keys(object1)
  const keys2 = Object.keys(object2)

  if (keys1.length !== keys2.length) {
    return false
  }

  for (const key of keys1) {
    const val1 = object1[key]
    const val2 = object2[key]
    const areObjects = isObject(val1) && isObject(val2)

    if ((areObjects && !deepEqual(val1, val2)) || (!areObjects && val1 !== val2)) {
      return false
    }
  }

  return true
}

export const makeDictionary = (arr: any[], keyProp: string, valueProp: string) => {
  return arr.reduce((acc, item) => ({ ...acc, [item[keyProp]]: item[valueProp] }), {})
}

export const makeArrayFromDictionary = (dictionary: Record<string, any>, keyProp: string = 'name', valueProp: string = 'value') => {
  return Object.entries(dictionary)
    .reduce((acc, [key, value]) => [...acc, { [keyProp]: key, [valueProp]: value }], [] as any[])
}
