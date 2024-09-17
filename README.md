# rps-engine-client-js
[![npm version](https://badge.fury.io/js/rps-engine-client-js.svg)](https://badge.fury.io/js/rps-engine-client-js)

Regdata RPS Engine Client library (JS/TS)

TypeScript support | NodeJS/Browser support | Request builder and validator | Easy to use

📚 [RPS Documentation](https://community.rpsprod.ch/library) | 📦 [NPM](https://www.npmjs.com/package/rps-engine-client-js) | [GitHub](https://github.com/RegdataSA/rps-engine-client-js)


### 🚨 **Since version 5.0.0 the API has changed significantly. The previous version is available in the [v4 branch](https://www.npmjs.com/package/rps-engine-client-js/v/4.0.0).**


## Documentation

The documentation for API is available in [RPS Community](https://community.rpsprod.ch/library). Here is a more detailed description of the library.

## Usage

First of all, you need to install the library:

```sh
npm i rps-engine-client-js
```

### RPS Agent

Then you're able to setup RPS Agent to communicate with the RPS Engine and RPS Identity Server.

```js
import { RPSAgent } from 'rps-engine-client-js'

const rpsAgent = new RPSAgent({
  engineUrl: 'https://engine.rpsprod.ch',
  identityUrl: 'https://identity.rpsprod.ch',

  // you can define the client id and secret here or later
  identity: {
    clientId: 'c6cbde13-542d-4849-a69e-3962ed09bc10',
    clientSecret: '37571534bf6d40878fa77cb7b354b3274e6c047bd6404468b0fa2345cb7ebe61',
  },
})

// to check identity url and client, you can try to get token
const token = await rpsAgent.getToken()
```

If you successfully get the token, you can start to use the RPS Agent to communicate with the RPS Engine.

```js
const output = await rpsAgent.transform({
  processingContexts: [
    // ...
  ],
  rightsContexts: [
    // ...
  ],
  requests: [
    // ...
  ],
})
```

transform input is a complicated structure, to define it correctly, you can use the `RPSCraft` class.

More methods and options are available in the API documentation below.

### RPSCraft

```js
import { RPSCraft } from 'rps-engine-client-js'

const rpsCraft = new RPSCraft()
rpsCraft.addRequest({
  instances: [
    {
      value: 'Jonny',
      className: 'User',
      propertyName: 'FirstName',
    },
  ],
  rightsContext: {
    evidences: [
      {
        name: 'Role',
        value: 'Admin',
      },
    ],
  },
  processingContext: {
    evidences: [
      {
        name: 'Action',
        value: 'Protect',
      },
    ],
  },
})
rpsCraft.addRequest({
  // ...
})

const input = rpsCraft.build()

const output = await rpsAgent.transform(input)
```


### Request validation

You can validate the request json before sending it to the RPS Engine.

```js
import { validateTransformJson } from 'rps-engine-client-js'

const result = validateTransformJson(json)
```

```ts
validateTransformJson(input: any): IRpsJsonValidationResult
```

`input` (any): The JSON input to validate and transform.
Returns:

An `IRpsJsonValidationResult` object containing the validation result. The structure of the IRpsJsonValidationResult object is as follows:

- `schemaResult` (`ValidatorResult | null`): The result of the schema validation. It's null if the validation fails.
- `errors` (`Array`): An array of error objects. Each error object has the following properties:
  - `message` (`string`): The error message.
  - `prettyPath` (`string`): A prettified string representation of the path to the property that caused the error in the input data.
  - `path` (`Array`): The path to the property that caused the error in the input data.
- `warns` (`Array`): An array of warning objects. Each warning object has the same structure as the error objects.


More methods and options are available in the API documentation below.

## TypeScript

The library is written in TypeScript and has type definitions. You can use it in your TypeScript project without any additional configuration.


## API

### RPSAgent API

RPSAgent constructor accepts an object with the following properties:

- `identityUrl` (string): Identity server url.
- `engineUrl` (string): Engine server url.
- `identity` (object): Identity server options.
  - `clientId` (string): Client id.
  - `clientSecret` (string): Client secret.
  - `authPath` (string): Path to the authentication endpoint. Default value is `'connect/token'`.
 
- `engine` (object): Engine server options.
  - `returnOriginalTransformResponse` (boolean): If true, the response will contain the original request. Default value is `false`.

```ts
const rpsAgent = new RPSAgent({
  engineUrl: 'https://engine.rpsprod.ch',
  identityUrl: 'https://identity.rpsprod.ch',
  identity: {
    clientId: 'c6cbde13-542d-4849-a69e-3962ed09bc10',
    clientSecret: '37571534bf6d40878fa77cb7b354b3274e6c047bd6404468b0fa2345cb7ebe61',
  },
})
```

Methods:

- get `isIdentitySet(): boolean`: Check if the identity url, client id, and client secret are set.

- get `isEngineSet`: Check if the engine url is set.

- get `isAuthenticated`: Check if the token is set.

- `setClient(data: { clientId: string, clientSecret: string }): void`: Set the client id and secret after the RPSAgent object is created.
  
- `trySetClient(data: { clientId: string, clientSecret: string }): Promise<void>`: Try to set the client id and secret. It immediately tries to get the token. Throws an error if the token is not received.

- `getToken(): Promise<{token: string, tokenType: string}>`: Get the token from the identity server. Automatically authenticates if the token is not set.

- `setEngineUrl(url: string): void`: Set the engine url after the RPSAgent object is created.

- `setIdentityUrl(url: string): void`: Set the identity url after the RPSAgent object is created.

- `resetAuth(): void`: Reset the token.

- `resetClient(): void`: Reset the client id and secret.

- `transform(requestData: ITransformInput): Promise<ITransformOutput>`: Send a request to the RPS Engine to transform the data.

- `transformAndReturnOriginal(requestData: ITransformInput): Promise<ITransformOutputWithOriginal>`: Send a request to the RPS Engine to transform the data and return the processed response `RPSAgent.processTransformOutput`.


- static `RPSAgent.processTransformOutput(transformOutput: ITransformOutput, requestData: ITransformInput): ITransformOutputWithOriginal`: Process the transform output and return the processed response with the original values near the processed values.


### RPSCraft API

RPSCraft constructor doesn't accept any arguments.

After creating an RPSCraft object, you can use the following methods:

- `addRequest(request: IRequest): RPSCraft`: Add a request to the RPSCraft object and return the RPSCraft object for chaining.
- `build(): ITransformInput`: Build the transform input object from the added requests. This input object can be used in the `transform` method of the RPSAgent object.
