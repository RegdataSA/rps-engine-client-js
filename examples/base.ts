import { EngineClient, IdentityClient } from '../src/index'

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

const input = {
  rightsContexts: [
    {
      guid: '5e084dc7-91ed-4803-b72b-249871f7debf',
      evidences: [
        {
          name: 'Role',
          value: 'Admin',
        },
      ],
    },
  ],
  processingContexts: [
    {
      guid: 'ffc6fc02-17d3-4e5c-95a5-234b35662169',
      evidences: [
        {
          name: 'Action',
          value: 'Protect',
        },
      ],
    },
  ],
  requests: [
    {
      guid: 'b0cf56d2-c330-4890-ac11-307805279c19',
      rightsContext: '5e084dc7-91ed-4803-b72b-249871f7debf',
      processingContext: 'ffc6fc02-17d3-4e5c-95a5-234b35662169',
      instances: [
        {
          className: 'User',
          propertyName: 'FirstName',
          value: 'Jonny',
        },
        {
          className: 'User',
          propertyName: 'LastName',
          value: 'Silverhand',
        },
        {
          className: 'User',
          propertyName: 'BirthDate',
          value: '16.11.1988',
        },
      ],
    },
  ],
}

const VITE_IDENTITY_URL = 'https://develop.rps.net/api/identity'
const VITE_CLIENT_ID = '6e45434d-a917-46f2-abbe-4c5ff1f59cea'
const VITE_CLIENT_SECRET = '26be9eeef7d34dcdac455d2ccaff5a0aadc3ce1151e34e9a993a3823a7dd8b19'
const VITE_ENGINE_URL = 'https://develop.rps.net/api/engine'

;(async() => {
  const identityClient = new IdentityClient({
    identityUrl: VITE_IDENTITY_URL,
    clientId: VITE_CLIENT_ID,
    clientSecret: VITE_CLIENT_SECRET,
  })

  const engineClient = new EngineClient({
    engineUrl: VITE_ENGINE_URL,
    identityClient,
  })

  try {
    const res = await engineClient.transform(input)
    console.warn('res', JSON.stringify(res, null, 2))
  }
  catch (error) {
    console.warn('error', error)
  }
})()
