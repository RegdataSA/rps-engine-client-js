import { describe, expect, it } from 'vitest'

import {
  RPSAgent,
} from '../src/index'

import { transformInput } from './data'

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

describe('RPSAgent', () => {
  it('base', () => {
    expect(RPSAgent).toBeDefined()
  })
  const isEnvProvided = process.env.VITE_IDENTITY_URL && process.env.VITE_CLIENT_ID && process.env.VITE_CLIENT_SECRET && process.env.VITE_ENGINE_URL
  if (isEnvProvided) {
    describe('Identity Actions', async() => {
      it('Input errors', async() => {
        const rpsAgent = new RPSAgent()

        expect(() => rpsAgent.getToken()).rejects.toThrowError('Identity url is not set')

        rpsAgent.setIdentityUrl(process.env.VITE_IDENTITY_URL!)

        expect(() => rpsAgent.getToken()).rejects.toThrowError('Client id or secret is not set')
      })

      it('Reset auth', async() => {
        const rpsAgent = new RPSAgent({
          identityUrl: process.env.VITE_IDENTITY_URL!,
          identity: {
            clientId: process.env.VITE_CLIENT_ID!,
            clientSecret: process.env.VITE_CLIENT_SECRET!,
          },
        })

        await rpsAgent.getToken()
        const token = rpsAgent.tokenInfo?.token
        expect(token).toBeDefined()

        rpsAgent.resetAuth()
        await new Promise(resolve => setTimeout(resolve, 1000))

        await rpsAgent.getToken()
        const token2 = rpsAgent.tokenInfo?.token
        expect(token2).toBeDefined()

        // diferent
        expect(token).not.toBe(token2)
      })
    })

    it('Request', async() => {
      const rpsAgent = new RPSAgent({
        identityUrl: process.env.VITE_IDENTITY_URL!,
        engineUrl: process.env.VITE_ENGINE_URL!,

        identity: {
          clientId: process.env.VITE_CLIENT_ID!,
          clientSecret: process.env.VITE_CLIENT_SECRET!,
        },
      })

      const res = await rpsAgent.transform(transformInput)

      expect(res).toBeDefined()
    })

    it('Wrong credentials', async() => {
      const rpsAgent = new RPSAgent({
        identityUrl: process.env.VITE_IDENTITY_URL!,
        engineUrl: process.env.VITE_ENGINE_URL!,
      })

      rpsAgent.setClient({
        clientId: 'wrong',
        clientSecret: 'wrong',
      })

      const res = await rpsAgent.transform(transformInput)
      expect(res.status).toBe(400)
    })

    it('Set valid credentials after wrong', async() => {
      const rpsAgent = new RPSAgent({
        identityUrl: process.env.VITE_IDENTITY_URL!,
        engineUrl: process.env.VITE_ENGINE_URL!,
      })

      rpsAgent.setClient({
        clientId: 'wrong',
        clientSecret: 'wrong',
      })

      await expect(() => rpsAgent.getToken()).rejects.toThrowError()

      await expect(rpsAgent.trySetClient({
        clientId: process.env.VITE_CLIENT_ID!,
        clientSecret: process.env.VITE_CLIENT_SECRET!,
      })).resolves.toBe(undefined)

      await expect(rpsAgent.trySetClient({
        clientId: 'wrong',
        clientSecret: 'wrong',
      })).rejects.toThrowError()
    })
  }
})
