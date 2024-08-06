import type { ValidatorResult } from 'jsonschema'

export interface IRpsJsonValidationItem {
  message: string
  prettyPath: string
  path: any[]
}

export interface IRpsJsonValidationResult {
  schemaResult: ValidatorResult | null
  errors: IRpsJsonValidationItem[]
  warns: IRpsJsonValidationItem[]
}
