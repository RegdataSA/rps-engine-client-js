import { describe, it, expect, vi } from 'vitest'
import TokenProvider from '../src/TokenProvider'

const identityServerHostName = 'identity'
const createTokenProvider = (params) => () => new TokenProvider(params)
describe(`Required parameters isn't defined`, () => {
  it(`"identityServerHostName" is not defined`, () => {
    expect(createTokenProvider()).toThrow(`"identityServerHostName" is required field, must be defined`)
  })
})

describe(`Authentication data isn't specified`, () => {
  it(`clientId === '' && clientSecret === ''`, async () => {
    expect.assertions(2)

    try {
      await new TokenProvider({identityServerHostName}).generateToken()
    } catch (e) {
      expect(e.message).toContain(`"clientId" is required field, must be defined`)
      expect(e.message).toContain(`"clientSecret" is required field, must be defined`)
    }
  })
})

describe(`Token request throw error`, () => {
  it(`getToken() must call generateToken() if unauthorized and throw error`, async () => {
    const tokenProvider = new TokenProvider({identityServerHostName})

    const errorMessage = 'Invalid secrets'
    tokenProvider.generateToken = await vi.fn().mockRejectedValue(errorMessage)

    try {
      await tokenProvider.getToken({clientId: 'clientId', clientSecret: 'clientSecret'})
      expect(tokenProvider.generateToken).toHaveBeenCalledTimes(1)
    } catch (e) {
      expect(e).toEqual(errorMessage)
    }
  })
})
