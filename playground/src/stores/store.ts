export const localCredentialsKey = 'credentials'

export const credentialsStore = {
  set: (credentials: {
    clientId: string
    clientSecret: string
    identityUrl: string
    engineUrl: string
  }) => {
    localStorage.setItem(localCredentialsKey, JSON.stringify(credentials))
  },

  get: (): null | {
    clientId: string
    clientSecret: string
    identityUrl: string
    engineUrl: string
  } => {
    const savedCredentials = localStorage.getItem(localCredentialsKey)
    const parsed = savedCredentials ? JSON.parse(savedCredentials) : null
    if (!parsed || !parsed.clientId || !parsed.clientSecret || !parsed.identityUrl || !parsed.engineUrl) {
      return null
    }

    return parsed
  },

  remove: () => {
    localStorage.removeItem(localCredentialsKey)
  },
}
