import { describe, it, expect, vi, beforeEach } from 'vitest'
import {
  createEngine,
  invalidRequestsStructures,
  quickCreateEngine,
  tokenProvider,
  validOriginalResponse,
  validProcessedResponse,
  validRequestData
} from './EngineClient.data'

describe(`Required parameters`, () => {
  const config = {baseURL: 'baseURL'}
  it(`create without params must throw error`, () => {
    expect(createEngine({})).toThrow()
  })
  it(`"config.baseUrl" not specified`, () => {
    expect(createEngine({tokenProvider})).toThrow()
    expect(createEngine({config: {}, tokenProvider})).toThrow()
  })
  it(`"tokenProvider" or "authorizationParams" not specified`, () => {
    expect(createEngine({config})).toThrow()
  })
  it(`"authorizationParams.identityServerHostName" not specified`, () => {
    expect(createEngine({config, authorizationParams: {}})).toThrow()
  })
  it(`"tokenProvider" instead of "authorizationParams"`, () => {
    expect(createEngine({config, tokenProvider})).not.toThrow()
  })
  it(`"authorizationParams" instead of "tokenProvider"`, () => {
    expect(createEngine({config, authorizationParams: {identityServerHostName: 'identity'}})).not.toThrow()
  })
})

describe(`transform()`, () => {
  const engine = quickCreateEngine()

  describe(`Transform received an error during getting token`, () => {
    const error = {status: 401, message: 'Unauthorized'}
    beforeEach(async () => {
      tokenProvider.generateToken = await vi.fn().mockRejectedValue(error)
    })

    const transformTest = async (errorHandler = () => {}) => {
      try {
        const response = await engine.transform(validRequestData)
        expect(engine.transform).toHaveBeenCalledTimes(2)

        return response
      } catch (e) {
        expect(e).toEqual(error)
        return errorHandler()
      }
    }

    it(`Throw error twice (should be the second attempt and an error as result)`, async () => {
      await transformTest()
    })

    it(`Throw error three times (should be the second attempt of the second request)`, async () => {
      await transformTest(transformTest)
    })
  })

  describe(`Transform responses`, () => {
    beforeEach(async () => {
      const tokenInfo = {token: 'token', tokenType: 'tokenType'}
      tokenProvider.generateToken = await vi.fn().mockResolvedValue(tokenInfo)
    })

    it(`return correct processed response`, async () => {
      engine.transformPostRequest = await vi.fn().mockResolvedValue(validOriginalResponse)

      const response = await engine.transform(validRequestData)
      expect(response).toEqual(validProcessedResponse)
    })

    it(`return correct original response`, async () => {
      engine.transformPostRequest = await vi.fn().mockResolvedValue(validOriginalResponse)

      const response = await engine.transform(validRequestData, {returnOriginal: true})
      expect(response).toEqual(validOriginalResponse)
    })

    it(`return empty value(not throw)`, async () => {
      engine.transformPostRequest = await vi.fn().mockResolvedValue('')

      await expect(engine.transform(validRequestData)).resolves
    })
  })

  describe(`Validate "requestData" (invalid structure/format must throw error)`, () => {
    const errors = [
      `Invalid "requestData" format/structure`,
      `"requestData" contains requests with invalid processing/rights context references`
    ]
    for (const [key, requestData] of Object.entries(invalidRequestsStructures)) {
      it(`Invalid structure: ${key}`, async () => {
        try {
          await engine.transform(requestData)
        } catch (e) {
          expect(errors.some(error => e.message.includes(error))).toBeTruthy()
        }
      })
    }
  })
})
