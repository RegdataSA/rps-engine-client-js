const { t } = useLocale('pages._transform.transformApiSingle.steps.request.editor.validation')

const types = ['processing', 'rights']

const arrays = [
  { root: 'processingContexts', property: 'evidences' },
  { root: 'rightsContexts', property: 'evidences' },
  { root: 'requests', property: 'instances' },
]

const requiredItems = [
  { root: 'processingContexts', property: 'guid' },
  { root: 'processingContexts', property: 'evidences' },
  { root: 'rightsContexts', property: 'guid' },
  { root: 'rightsContexts', property: 'evidences' },
  { root: 'requests', property: 'guid' },
  { root: 'requests', property: 'processingContext' },
  { root: 'requests', property: 'rightsContext' },
  { root: 'requests', property: 'instances' },
]

export const getFieldValue = (json: any, root: string, property: string) => json?.[root]?.[0]?.[property]

const validate = (json: any, items: any[], getError: any) => {
// @ts-ignore
  const mapItems = item => getError(json, item)
  return items.map(mapItems).filter(item => !!item)
}

// @ts-ignore
const getErrorForGuids = (json, type) => {
  const contexts = `${type}Contexts`
  const contextReference = `${type}Context`
  const contextGuid = getFieldValue(json, contexts, 'guid')
  const requestContextGuid = getFieldValue(json, 'requests', contextReference)
  const valid = contextGuid === requestContextGuid
  const error = {
    path: ['requests'],
    message: t('reference', { contextReference, contexts }),
  }
  return valid ? null : error
}

// @ts-ignore
const getErrorForRequiredItems = (json, { root, property }) => {
  const isExist = getFieldValue(json, root, property)
  return isExist ? null : { path: [root], message: t('missing', { property }) }
}

// @ts-ignore
const getErrorForNoEmptyArrays = (json, { root, property }) => {
  const arr = getFieldValue(json, root, property)
  const valid = Array.isArray(arr) && arr.length > 0
  return valid ? null : { path: [root], message: t('atListOneItem', { property }) }
}

// @ts-ignore
const getErrorForArrays = (json, { root, property }) => {
  const arr = getFieldValue(json, root, property)
  const valid = Array.isArray(arr)
  return valid ? null : { path: [root], message: t('validArray', { property }) }
}

export const validateGuids = (json: any) => validate(json, types, getErrorForGuids)

export const validateRequiredItems = (json: any) => validate(json, requiredItems, getErrorForRequiredItems)

export const validateNoEmptyArrays = (json: any) => validate(json, arrays, getErrorForNoEmptyArrays)

export const validateArrays = (json: any) => validate(json, arrays, getErrorForArrays)
