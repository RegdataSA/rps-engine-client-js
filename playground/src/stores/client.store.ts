import type { ITransformInput, ITransformOutput } from 'rps-engine-client-js/dev'

import { RPSAgent } from 'rps-engine-client-js/dev'

import { credentialsStore } from './store'

export interface IIdentityCredentials {
  clientId: string
  clientSecret: string
  identityUrl: string
}

export interface ICredentials extends IIdentityCredentials {
  engineUrl: string
}

export const useClientStore = defineStore('client-store', () => {
  const initializeLoading = ref(false)

  const rpsAgent = shallowRef(new RPSAgent())

  const engineUrlDefault = 'https://engine.rpsprod.ch'
  const engineUrlPlaceholder = 'https://engine.rpsprod.ch'
  const engineUrl = ref(engineUrlDefault)

  const identityUrlDefault = 'https://identity.rpsprod.ch'
  const identityUrlPlaceholder = 'https://identity.rpsprod.ch'
  const identityUrl = ref(identityUrlDefault)

  const agentCredentials = ref<ICredentials>({
    identityUrl: '',
    clientId: '',
    clientSecret: '',
    engineUrl: '',
  })

  const isAuthorized = computed(() => agentCredentials.value.identityUrl !== '')
  const isSavedToLocalStorage = ref(false)

  const isExpanded = useLocalStorage('define-client-instance-expanded', true)
  const $notify = useNotify()
  const toggleExpand = () => {
    if (isExpanded.value && !isAuthorized.value) {
      $notify.error('Please finish the initialization')
      return
    }

    isExpanded.value = !isExpanded.value
  }

  const clearCredentials = () => {
    agentCredentials.value = { identityUrl: '', clientId: '', clientSecret: '', engineUrl: '' }

    rpsAgent.value.setEngineUrl('')
    rpsAgent.value.setIdentityUrl('')
    rpsAgent.value.resetClient()

    credentialsStore.remove()
    isSavedToLocalStorage.value = false
  }

  /**
   * Check if the identity client is valid
   */
  const checkIdentity = async(credentials: IIdentityCredentials) => {
    const agent = new RPSAgent({
      identityUrl: credentials.identityUrl,
      identity: {
        clientId: credentials.clientId,
        clientSecret: credentials.clientSecret,
      },
    })

    await agent.getToken()
  }

  const setCredentials = async(credentials: ICredentials) => {
    try {
      await checkIdentity(credentials)

      rpsAgent.value.setEngineUrl(credentials.engineUrl)
      rpsAgent.value.setIdentityUrl(credentials.identityUrl)

      await rpsAgent.value.trySetClient({
        clientId: credentials.clientId,
        clientSecret: credentials.clientSecret,
      })

      agentCredentials.value = credentials
    }
    catch (error: any) {
      let message = 'Failed to fetch token. Try again or check the identity url, client id and client secret.'

      if (error.code === 'ERR_NETWORK') {
        message += ' Network error.'
      }
      else if (error.status === 404) {
        message += ' Not found error.'
      }
      else if (error.status === 400) {
        message += ' Bad request error.'
      }
      $notify.error(message)

      throw error
    }
  }

  const saveCredentialsToLocalStorage = () => {
    if (!agentCredentials.value.clientId || !agentCredentials.value.clientSecret || !agentCredentials.value.identityUrl || !agentCredentials.value.engineUrl) {
      throw new Error('Please set the credentials first')
    }

    credentialsStore.set(agentCredentials.value)
    isSavedToLocalStorage.value = true
  }

  const removeCredentialsFromLocalStorage = () => {
    credentialsStore.remove()
    isSavedToLocalStorage.value = false
  }

  const savedCredentials = credentialsStore.get()
  if (savedCredentials) {
    isSavedToLocalStorage.value = true

    ;(async() => {
      try {
        initializeLoading.value = true

        await setCredentials({
          clientId: savedCredentials.clientId,
          clientSecret: savedCredentials.clientSecret,
          identityUrl: savedCredentials.identityUrl,
          engineUrl: savedCredentials.engineUrl,
        })

        agentCredentials.value = savedCredentials

        await new Promise(resolve => setTimeout(resolve, 400))
      }
      catch (error: any) {}
      finally {
        initializeLoading.value = false
      }
    })()
  }

  const initializationPromise = new Promise<void>((resolve) => {
    if (!savedCredentials) {
      resolve()
      return
    }

    watch(initializeLoading, (value) => {
      if (!value) {
        resolve()
      }
    })
  })

  const lastTransformData = useStorage('last-transform-data', {
    request: null as ITransformInput | null,
    response: null as ITransformOutput | null,
    timestamp: null as number | null,
  })

  const transform = async(input: ITransformInput) => {
    if (!isAuthorized.value) {
      $notify.warning('The RPSAgent is not authorized. Please set the credentials first in the app header.')
    }

    const response = await rpsAgent.value.transform(input)

    lastTransformData.value.request = input
    lastTransformData.value.response = response
    lastTransformData.value.timestamp = Date.now()

    return response
  }

  const clearTransformData = () => {
    lastTransformData.value = {
      request: null,
      response: null,
      timestamp: null,
    }
  }

  return {
    rpsAgent,
    isAuthorized,
    checkIdentity,

    isExpanded,
    toggleExpand,

    engineUrl,
    engineUrlPlaceholder,
    engineUrlDefault,

    identityUrl,
    identityUrlPlaceholder,
    identityUrlDefault,

    setCredentials,
    initializeLoading,

    clearCredentials,
    saveCredentialsToLocalStorage,
    removeCredentialsFromLocalStorage,

    initializationPromise,
    isSavedToLocalStorage,

    transform,
    lastTransformData,
    clearTransformData,
  }
})
