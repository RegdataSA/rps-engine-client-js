import type { IContext, IEvidence, IInstance, IRequest, ITransformInput, ITransformInputContext } from './types'

import { v4 as uuidv4 } from 'uuid'

import { deepEqual, isObject, makeArrayFromDictionary, makeDictionary } from './utils'

/**
 * Represents the RPSCraft class, which is responsible for creating requests
 * and managing the rights and processing contexts.
 */
export class RPSCraft {
  requests: IRequest[] = []
  rightsContextsDictionary: Record<string, IContext> = {}
  processingContextsDictionary: Record<string, IContext> = {}

  /**
   * Adds a request to the RPSCraft instance.
   * @param data - The data for the request.
   * @returns The RPSCraft instance.
   */
  addRequest(data: {
    rightsContext: IContext
    processingContext?: IContext
    instances: IInstance[]
  }): RPSCraft {
    const rightsContextKey = this.#getOrAddContextKey('rights', data.rightsContext)
    const processingContextKey = data.processingContext ? this.#getOrAddContextKey('processing', data.processingContext) : undefined
    const instances = data.instances

    const existingRequest = this.requests.find((r) => {
      return r.rightsContext === rightsContextKey && r.processingContext === processingContextKey
    })

    if (!existingRequest) {
      this.requests.push({
        guid: uuidv4(),
        rightsContext: rightsContextKey,
        processingContext: processingContextKey,
        instances,
      })
    }
    else {
      existingRequest.instances = [...existingRequest.instances, ...instances]
    }

    return this
  }

  /**
   * Processes the evidences for a given type.
   * @param type - The type of context ('rights' or 'processing').
   * @param evidences - The evidences to process.
   * @returns The processed evidences.
   * @throws Error if the evidences are empty or have an invalid structure.
   */
  #processEvidences(type: 'rights' | 'processing', evidences: IEvidence[]) {
    if (Array.isArray(evidences) && evidences.length > 0) {
      return makeDictionary(evidences, 'name', 'value')
    }
    else if (isObject(evidences) && Object.keys(evidences).length > 0) {
      return evidences
    }
    else {
      throw new Error(`Empty evidences or invalid evidences structure in "${type}Context"`)
    }
  }

  #getOrAddContextKey(type: 'rights' | 'processing', context: IContext) {
    const processedEvidences = this.#processEvidences(type, context?.evidences)

    let contexts: Record<string, IContext>
    if (type === 'rights') {
      contexts = this.rightsContextsDictionary
    }
    else if (type === 'processing') {
      contexts = this.processingContextsDictionary
    }
    else {
      throw new Error(`Unknown type: ${type}`)
    }

    const existingContext = Object
      .entries(contexts)
      .find(([, evidences]) => deepEqual(processedEvidences, evidences))

    const guid = !existingContext ? uuidv4() : existingContext[0]

    if (!existingContext) contexts[guid] = processedEvidences

    return guid
  }

  #buildContextsStructure(contextsDictionary: Record<string, IContext>): ITransformInputContext[] {
    return Object.entries(contextsDictionary).reduce((acc, [guid, evidences]) => {
      return [...acc, { guid, evidences: makeArrayFromDictionary(evidences) }]
    }, [] as ITransformInputContext[])
  }

  /**
   * Builds the transformation input object.
   * @returns The transformation input object.
   */
  build(): ITransformInput {
    return {
      processingContexts: this.#buildContextsStructure(this.processingContextsDictionary),
      requests: this.requests,
      rightsContexts: this.#buildContextsStructure(this.rightsContextsDictionary),
    }
  }
}
