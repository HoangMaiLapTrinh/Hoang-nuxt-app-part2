import axios, { type AxiosInstance } from 'axios'

export default defineNuxtPlugin(() => {
  const instance: AxiosInstance = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com',
    timeout: 15000
  })

  return {
    provide: { axios: instance }
  }
})