export interface ITokenInfo {
  token: string
  tokenType: string
}

export interface IEvidence {
  name: string
  value: string
}

export interface IContext {
  evidences: IEvidence[]
}

export interface IInstance {
  className?: string
  propertyName?: string
  value: string

  dependencyContext?: {
    evidences: IEvidence[]
  }

  loggingContext?: {
    evidences: IEvidence[]
  }
}

export interface IResponseInstance extends IInstance {
  error?: string
}

export interface IRequest {
  guid: string
  rightsContext: string
  processingContext?: string
  instances: IInstance[]
}

export interface IResponse {
  request: string
  rightsContext: string
  processingContext: string
  instances: IResponseInstance[]
}

export interface ITransformInputContext {
  guid: string
  evidences: IEvidence[]
}

export interface ITransformInput {
  rightsContexts: ITransformInputContext[]
  processingContexts: ITransformInputContext[]
  requests: IRequest[]
}

export interface ITransformOutput {
  duration: number
  responses: IResponse[]
  status: number
  error: {
    error?: any
    errors?: any
  }
}

// With originals
export interface IResponseInstanceWithOriginal extends Omit<IResponseInstance, 'value'> {
  original: string
  transformed?: string
}

export interface IResponseWithOriginal extends Omit<IResponse, 'instances'>{
  instances: IResponseInstanceWithOriginal[]
}

export interface ITransformOutputWithOriginal {
  duration: number
  responses: IResponseWithOriginal[]
}
