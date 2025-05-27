import {ICredentials} from './client.store'

export const localCredentialsKey = 'credentials'

export const credentialsStore = {
  set: (credentials: ICredentials) => {
    localStorage.setItem(localCredentialsKey, JSON.stringify(credentials))
  },

  get: (): null | ICredentials => {
    const savedCredentials = localStorage.getItem(localCredentialsKey)
    const parsed = savedCredentials ? JSON.parse(savedCredentials) : null
    const requiredKeys = ['clientId', 'clientSecret', 'identityUrl', 'engineUrl']

    if (!parsed || typeof parsed !== 'object' || !requiredKeys.every(key => key in parsed)) {
      return null
    }

    return parsed
  },

  remove: () => {
    localStorage.removeItem(localCredentialsKey)
  },
}
