import type { Schema } from 'jsonschema'

import { Validator } from 'jsonschema'

export const schemaValidator = new Validator()

// C# Format
const evidenceSchemaCSharp = {
  id: '/EvidenceCSharp',
  type: 'object',
  properties: {
    Name: { type: 'string', minLength: 1 },
    Value: { type: 'string', minLength: 1 },
  },
  required: ['Name', 'Value'],
  additionalProperties: false,
}
schemaValidator.addSchema(evidenceSchemaCSharp, '/EvidenceCSharp')

const evidencesSchemaCSharp = {
  id: '/EvidencesCSharp',
  type: 'array',
  items: { $ref: '/EvidenceCSharp' },
  minItems: 1,
}
schemaValidator.addSchema(evidencesSchemaCSharp, '/EvidencesCSharp')

const extendedEvidencesSchemaCSharp = {
  id: '/ExtendedEvidencesCSharp',
  oneOf: [
    { $ref: '/EvidencesCSharp' },
    {
      type: 'object',
      patternProperties: {
        '.+': { type: 'String' },
      },
      minProperties: 1,
    },
  ],
}
schemaValidator.addSchema(extendedEvidencesSchemaCSharp, '/ExtendedEvidencesCSharp')

const instanceSchemaCSharp: Schema = {
  id: '/InstanceCSharp',
  type: ['object', 'null'],
  properties: {
    ClassName: { type: 'string' },
    PropertyName: { type: 'string' },
    Value: { type: 'any' },
    DependencyContext: {
      type: ['object', 'null'],
      properties: {
        Evidences: { $ref: '/EvidencesCSharp' },
      },
    },
    LoggingContext: {
      type: ['object', 'null'],
      properties: {
        Evidences: { $ref: '/EvidencesCSharp' },
      },
    },
  },

  required: ['Value'],
  additionalProperties: false,
}
schemaValidator.addSchema(instanceSchemaCSharp, '/InstanceCSharp')

// const inputInstancesSchemaCSharp = {
//   id: '/InputInstancesCSharp',
//   type: 'array',
//   items: {
//     type: 'object',
//     properties: {
//       ClassName: { type: 'string' },
//       PropertyName: { type: 'string' },
//       Value: { type: 'any' },
//     },
//     required: ['ClassName', 'PropertyName'],
//     minItems: 1,
//   },
// }
// schemaValidator.addSchema(inputInstancesSchemaCSharp, '/InputInstancesCSharp')

const instancesSchemaCSharp = {
  id: '/InstancesCSharp',
  type: 'array',
  items: { $ref: '/InstanceCSharp' },
  minItems: 1,
}
schemaValidator.addSchema(instancesSchemaCSharp, '/InstancesCSharp')

const contextSchemaCSharp = {
  id: '/ContextCSharp',
  type: 'object',
  properties: {
    Guid: { type: 'string' },
    Evidences: { $ref: '/EvidencesCSharp' },
  },
  required: ['Guid', 'Evidences'],
  additionalProperties: false,
}

schemaValidator.addSchema(contextSchemaCSharp, '/ContextCSharp')

// const inputContextSchemaCSharp = {
//   id: '/InputContextCSharp',
//   type: 'object',
//   properties: {
//     Evidences: { $ref: '/ExtendedEvidencesCSharp' },
//   },
//   required: ['Evidences'],
// }
// schemaValidator.addSchema(inputContextSchemaCSharp, '/InputContextCSharp')

const rightsContextsSchemaCSharp = {
  id: '/RightsContextsCSharp',
  type: 'Array',
  items: { $ref: '/ContextCSharp' },
  minItems: 1,
}
schemaValidator.addSchema(rightsContextsSchemaCSharp, '/RightsContextsCSharp')

const processingContextsSchemaCSharp = {
  id: '/ProcessingContextsCSharp',
  type: 'Array',
  items: { $ref: '/ContextCSharp' },
  minItems: 0,
}
schemaValidator.addSchema(processingContextsSchemaCSharp, '/ProcessingContextsCSharp')

const requestsSchemaCSharp = {
  id: '/RequestsCSharp',
  type: 'Array',
  items: {
    type: 'object',
    properties: {
      Guid: { type: 'string' },
      RightsContext: { type: 'string' },
      ProcessingContext: { type: 'string' },
      Instances: { $ref: '/InstancesCSharp' },
    },
    required: ['Guid', 'RightsContext', 'Instances'],
    additionalProperties: false,
  },
  minItems: 1,
}
schemaValidator.addSchema(requestsSchemaCSharp, '/RequestsCSharp')

const requestDataSchemaCSharp = {
  id: '/RequestDataCSharp',
  type: 'object',
  properties: {
    ProcessingContexts: { $ref: '/ProcessingContextsCSharp' },
    RightsContexts: { $ref: '/RightsContextsCSharp' },
    Requests: { $ref: '/RequestsCSharp' },
    LoggingContext: {
      type: ['object', 'null'],
      properties: {
        Evidences: { $ref: '/EvidencesCSharp' },
      },
    },
  },
  required: ['RightsContexts', 'Requests'],
  additionalProperties: false,
}
schemaValidator.addSchema(requestDataSchemaCSharp, '/RequestDataCSharp')

// const requestInputDataSchemaCSharp = {
//   id: 'RequestInputDataCSharp',
//   type: 'object',
//   properties: {
//     ProcessingContext: { $ref: '/InputContextCSharp' },
//     RightsContext: { $ref: '/InputContextCSharp' },
//     Instances: { $ref: 'InputInstancesCSharp' },
//   },
//   required: ['RightsContext', 'Instances'],
// }
// schemaValidator.addSchema(requestInputDataSchemaCSharp, '/RequestInputDataCSharp')

// JS Format
const evidenceSchema = {
  id: '/Evidence',
  type: 'object',
  properties: {
    name: { type: 'string', minLength: 1 },
    value: { type: 'string', minLength: 1 },
  },
  required: ['name', 'value'],
  additionalProperties: false,
}
schemaValidator.addSchema(evidenceSchema, '/Evidence')

const evidencesSchema = {
  id: '/Evidences',
  type: 'array',
  items: { $ref: '/Evidence' },
  minItems: 1,
}
schemaValidator.addSchema(evidencesSchema, '/Evidences')

const extendedEvidencesSchema = {
  id: '/ExtendedEvidences',
  oneOf: [
    { $ref: '/Evidences' },
    {
      type: 'object',
      patternProperties: {
        '.+': { type: 'String' },
      },
      minProperties: 1,
    },
  ],
}
schemaValidator.addSchema(extendedEvidencesSchema, '/ExtendedEvidences')

const instanceSchema: Schema = {
  id: '/Instance',
  type: 'object',
  properties: {
    className: { type: 'string' },
    propertyName: { type: 'string' },
    value: { type: 'any' },
    dependencyContext: {
      type: ['object', 'null'],
      properties: {
        evidences: { $ref: '/Evidences' },
      },
    },
    loggingContext: {
      type: ['object', 'null'],
      properties: {
        evidences: { $ref: '/Evidences' },
      },
    },
  },

  required: ['value'],
  additionalProperties: false,
}

schemaValidator.addSchema(instanceSchema, '/Instance')

// const inputInstancesSchema = {
//   id: '/InputInstances',
//   type: 'array',
//   items: {
//     type: 'object',
//     properties: {
//       className: { type: 'string' },
//       propertyName: { type: 'string' },
//       value: { type: 'any' },
//     },
//     required: ['className', 'propertyName'],
//     minItems: 1,
//   },
// }
// schemaValidator.addSchema(inputInstancesSchema, '/InputInstances')

const instancesSchema = {
  id: '/Instances',
  type: 'array',
  items: { $ref: '/Instance' },
  minItems: 1,
}
schemaValidator.addSchema(instancesSchema, '/Instances')

const contextSchema = {
  id: '/Context',
  type: 'object',
  properties: {
    guid: { type: 'string' },
    evidences: { $ref: '/Evidences' },
  },
  required: ['guid', 'evidences'],
  additionalProperties: false,
}
schemaValidator.addSchema(contextSchema, '/Context')

// const inputContextSchema = {
//   id: '/InputContext',
//   type: 'object',
//   properties: {
//     evidences: { $ref: '/ExtendedEvidences' },
//   },
//   required: ['evidences'],
// }
// schemaValidator.addSchema(inputContextSchema, '/InputContext')

const rightsContextsSchema = {
  id: '/RightsContexts',
  type: 'Array',
  items: { $ref: '/Context' },
  minItems: 1,
}
schemaValidator.addSchema(rightsContextsSchema, '/RightsContexts')

const processingContextsSchema = {
  id: '/ProcessingContexts',
  type: 'Array',
  items: { $ref: '/Context' },
  minItems: 0,
}
schemaValidator.addSchema(processingContextsSchema, '/ProcessingContexts')

const requestsSchema = {
  id: '/Requests',
  type: 'Array',
  items: {
    type: 'object',
    properties: {
      guid: { type: 'string' },
      rightsContext: { type: 'string' },
      processingContext: { type: 'string' },
      instances: { $ref: '/Instances' },
    },
    required: ['guid', 'rightsContext', 'instances'],
    additionalProperties: false,
  },

  minItems: 1,
}
schemaValidator.addSchema(requestsSchema, '/Requests')

const requestDataSchema = {
  id: '/RequestData',
  type: 'object',
  properties: {
    processingContexts: { $ref: '/ProcessingContexts' },
    rightsContexts: { $ref: '/RightsContexts' },
    requests: { $ref: '/Requests' },
    loggingContext: {
      type: ['object', 'null'],
      properties: {
        evidences: { $ref: '/Evidences' },
      },
    },
  },
  required: ['rightsContexts', 'requests'],
  additionalProperties: false,
}
schemaValidator.addSchema(requestDataSchema, '/RequestData')

// const requestInputDataSchema = {
//   id: 'RequestInputData',
//   type: 'object',
//   properties: {
//     processingContext: { $ref: '/InputContext' },
//     rightsContext: { $ref: '/InputContext' },
//     instances: { $ref: 'InputInstances' },
//   },
//   required: ['rightsContext', 'instances'],
// }
// schemaValidator.addSchema(requestInputDataSchema, '/RequestInputData')
