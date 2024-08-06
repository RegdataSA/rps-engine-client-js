import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, CreateAxiosDefaults, InternalAxiosRequestConfig } from 'axios'

import axios from 'axios'

export const createHttpClient = (
  config: CreateAxiosDefaults,
  errorHandler?: (error: any) => void,
) => {
  const addDurationInterceptor = (
    resOrErr: AxiosResponse | any,
    type = 'success',
  ) => {
    resOrErr.config.metadata.endTime = new Date()
    resOrErr.duration = resOrErr.config.metadata.endTime - resOrErr.config.metadata.startTime

    return type === 'success' ? resOrErr : Promise.reject(resOrErr)
  }

  const loggerInterceptor = (config: AxiosRequestConfig) => config as InternalAxiosRequestConfig
  const startTimeInterceptor = (config: AxiosRequestConfig) => ({ ...config, metadata: { startTime: new Date() } } as InternalAxiosRequestConfig)

  const errorHandlerInterceptor = (error: AxiosResponse) => {
    const errorFullInfo = error || {}
    // @ts-expect-error
    const errorResponse = errorFullInfo.response || {}
    const errorData = { ...errorFullInfo, ...errorResponse.data, status: errorResponse.status }

    if (errorHandler) {
      errorHandler(errorData)
    }

    return Promise.reject(errorData)
  }

  const setInterceptors = (httpClient: AxiosInstance) => {
    httpClient.interceptors.request.use(startTimeInterceptor)
    httpClient.interceptors.request.use(loggerInterceptor)
    httpClient.interceptors.response.use(
      response => addDurationInterceptor(response, 'success'),
      error => addDurationInterceptor(error, 'error'),
    )

    httpClient.interceptors.request.use(config => config, errorHandlerInterceptor)
    httpClient.interceptors.response.use(response => response, errorHandlerInterceptor)
  }

  const axiosClient = axios.create(config)

  setInterceptors(axiosClient)
  return axiosClient
}
