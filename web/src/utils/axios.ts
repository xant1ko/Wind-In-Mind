import type { AxiosInstance } from 'axios'
import axios from 'axios'
import { resolveApiUrl } from '@/api'

const $axios: AxiosInstance = axios.create({
  baseURL: resolveApiUrl(import.meta.env.VITE_API_BASE_URL, window.location.href),
  // baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    // Authorization: "Bearer auth",
    'Accept': 'application/json',
    // mode: 'cors',
    'Access-Control-Allow-Credentials': true,
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, PUT, PATCH, GET, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Origin, X-Api-Key, X-Requested-With, Content-Type, Accept, Authorization',
  },
})

export default $axios
