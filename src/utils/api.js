import axios from 'axios'
import { BASE_URL } from './constants'

const api = axios.create({
  baseURL: BASE_URL
})

// Interceptor de REQUEST: antes de cada petición, agrega el token guardado
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = token
  }
  return config
})

// Interceptor de RESPONSE: después de cada respuesta, guarda el token nuevo
api.interceptors.response.use(response => {
  const nuevoToken = response.headers['authorization']
  if (nuevoToken) {
    localStorage.setItem('token', nuevoToken)
  }
  return response
})

export default api