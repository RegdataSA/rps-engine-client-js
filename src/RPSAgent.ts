import type { AxiosInstance } from 'axios'

import type { IResponseInstanceWithOriginal, IResponseWithOriginal, ITokenInfo, ITransformInput, ITransformOutput, ITransformOutputWithOriginal } from './types'

import { createHttpClient } from './http'

/**
 * Represents an RPS (Regdata Security Suite) Agent.
 * This class provides methods for authentication, token generation, and transforming data using an engine.
 */
export class RPSAgent {
  #httpIdentity: AxiosInstance
  #httpEngine: AxiosInstance

  #clientSecret?: string | null = null
  #clientId?: string | null = null

  public authPath = 'connect/token'
  public tokenInfo: ITokenInfo | null = null

  constructor(options?: {
    /**
     * Identity server url
     */
    identityUrl?: string

    /**
     * Engine server url
     */
    engineUrl?: string

    identity?: {
      clientId?: string
      clientSecret?: string

      /**
       * @default 'connect/token'
      */
      authPath?: string
    }
  }) {
    if (options?.identity) {
      this.#clientId = options.identity.clientId || null
      this.#clientSecret = options.identity.clientSecret || null
      this.authPath = options.identity.authPath || this.authPath
    }

    this.#httpIdentity = createHttpClient({
      baseURL: options?.identityUrl,
    })

    this.#httpEngine = createHttpClient({
      baseURL: options?.engineUrl,
    })
  }

  /**
   * Check if identity server url, client id, and client secret are set
   */
  get isIdentitySet(): boolean {
    return !!this.#httpIdentity.defaults.baseURL && !!this.#clientId && !!this.#clientSecret
  }

  /**
   * Check if engine server url is set
   */
  get isEngineSet(): boolean {
    return !!this.#httpEngine.defaults.baseURL
  }

  /**
   * Check if the identity is authorized
   */
  get isAuthenticated(): boolean {
    return !!this.tokenInfo
  }

  /**
   * Check if credentials are valid before setting the client.
   *
   * - If something goes wrong, it throws an error.
   * - If the credentials are valid, it sets the client and token info (agent is authenticated).
   */
  async trySetClient(data: {
    clientId: string
    clientSecret: string
  }): Promise<void> {
    this.#checkIdentityUrl()

    const tokenInfo = await this.#generateToken(data)

    this.#clientId = data.clientId
    this.#clientSecret = data.clientSecret
    this.tokenInfo = tokenInfo
  }

  /**
   * Set client id and secret without checking if they are valid. Use trySetClient if you want to check if the credentials are valid before setting them.
   * Resets the token info.
   */
  setClient(data: {
    clientId: string
    clientSecret: string
  }) {
    this.#clientId = data.clientId
    this.#clientSecret = data.clientSecret
    this.resetAuth()
  }

  setIdentityUrl(identityUrl: string) {
    this.#httpIdentity.defaults.baseURL = identityUrl
    this.resetAuth()
  }

  setEngineUrl(engineUrl: string) {
    this.#httpEngine.defaults.baseURL = engineUrl
  }

  async getToken(): Promise<ITokenInfo> {
    this.#checkIdentityUrl()
    this.#checkIdentityClient()

    if (this.tokenInfo) {
      return this.tokenInfo
    }
    else {
      const tokenInfo = await this.#generateToken({
        clientId: this.#clientId!,
        clientSecret: this.#clientSecret!,
      })

      this.tokenInfo = tokenInfo
      return tokenInfo
    }
  }

  async #generateToken(client: {
    clientId: string
    clientSecret: string
  }): Promise<ITokenInfo> {
    const data = `grant_type=client_credentials&client_id=${client.clientId}&client_secret=${client.clientSecret}`
    const response = await this.#httpIdentity.post(this.authPath, data)
    const tokenInfo = this.#parseTokenInfo(response?.data)
    return tokenInfo
  }

  #parseTokenInfo(tokenInfo: any) {
    const {
      access_token,
      token,
      expires_in,
      expiresIn,
      token_type,
      tokenType,
      scope,
    } = tokenInfo || {}

    return {
      token: token || access_token,
      expiresIn: expiresIn || expires_in,
      tokenType: tokenType || token_type,
      scope,
    }
  }

  resetAuth() {
    this.tokenInfo = null
  }

  resetClient() {
    this.resetAuth()
    this.#clientId = null
    this.#clientSecret = null
  }

  async transform(requestData: ITransformInput, secondAttempt = false): Promise<ITransformOutput> {
    try {
      this.#checkEngineUrl()

      const tokenInfo = await this.getToken()
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `${tokenInfo.tokenType} ${tokenInfo.token}`,
      }

      const response = await this.#httpEngine.post('transform', requestData, { headers })

      return {
        responses: response.data.responses,

        // http interceptor adds duration to response
        duration: (response as any).duration,

        status: response.status,
        error: response.data.errors ? { errors: response.data.errors } : { error: response.data.error },
      }
    }

    catch (error: any) {
      if (error.status === 401 && !secondAttempt) {
        this.resetAuth()
        return this.transform(requestData, true)
      }

      return {
        responses: [],
        status: error.response?.status || 500,
        error: error.response?.data || error.message,
        duration: error.duration || 0,
      }
    }
  }

  async transformAndReturnOriginal(requestData: ITransformInput): Promise<ITransformOutputWithOriginal> {
    const response = await this.transform(requestData)
    return RPSAgent.processTransformOutput(response, requestData)
  }

  /**
   * Process transform output and add original values to the response
   */
  static processTransformOutput(transformOutput: ITransformOutput, requestData: ITransformInput): ITransformOutputWithOriginal {
    const responses = transformOutput.responses

    const processedResponses = responses.map<IResponseWithOriginal>((response) => {
      const request = requestData.requests.find(({ guid }) => guid === response.request)!

      return {
        ...response,
        instances: response.instances.map(({ className, propertyName, value: transformed, error }, instanceIndex) => {
          const instance: IResponseInstanceWithOriginal = {
            className,
            propertyName,
            transformed,
            original: request.instances[instanceIndex].value,
          }

          if (error) {
            instance.error = error
          }

          return instance
        }),
      }
    })

    return {
      ...transformOutput,
      responses: processedResponses,
    }
  }

  #checkIdentityUrl() {
    if (!this.#httpIdentity.defaults.baseURL) {
      throw new Error('Identity url is not set')
    }
  }

  #checkEngineUrl() {
    if (!this.#httpEngine.defaults.baseURL) {
      throw new Error('Engine url is not set')
    }
  }

  #checkIdentityClient() {
    if (!this.#httpIdentity.defaults.baseURL) {
      throw new Error('Identity url is not set')
    }

    if (!this.#clientId || !this.#clientSecret) {
      throw new Error('Client id or secret is not set')
    }
  }
}
