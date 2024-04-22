import axios from 'axios'
import cookie from 'js-cookie'

const axiosInstance = axios.create({
  baseURL: process.env.API_ENDPOINT,
})

// Interceptor to set the token from the cookie to the headers
axiosInstance.interceptors.request.use((config) => {
  const token = cookie.get('token')
  const expireDateUtc = cookie.get('expireDateUtc')

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default axiosInstance