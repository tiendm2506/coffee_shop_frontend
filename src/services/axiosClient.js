import axios from 'axios'
import { API_BASE_URL, API_ENDPOINTS } from '@/constants'
import { logout, setAuth } from '@/store/authSlice'
import { store } from '@/store'

let isRefreshing = false
let failedQueue = []

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error)
    } else {
      prom.resolve(token)
    }
  })
  failedQueue = []
}

const axiosClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

const apiRefreshToken = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Add token automatically
axiosClient.interceptors.request.use((config) => {
  const token = store.getState().auth.accessToken
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Handle response
axiosClient.interceptors.response.use(
  (response) => {
    return response.data
  },
  async (error) => {
    const state = store.getState()
    const originalRequest = error.config
    if (error.response?.status === 401) {
      store.dispatch(logout())
      return Promise.reject(error)
    }

    if (error.response?.status === 403 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject })
        })
          .then((token) => {
            originalRequest.headers['Authorization'] = 'Bearer ' + token
            return axiosClient(originalRequest)
          })
          .catch((err) => Promise.reject(err))
      }

      originalRequest._retry = true
      isRefreshing = true

      try {
        const { response } = await apiRefreshToken.post(
          API_ENDPOINTS.REFRESH_TOKEN,
          {},
          {
            headers: {
              'x-access-token': state.auth.accessToken,
              'Authorization': `Bearer ${state.auth.refreshToken}`
            }
          }
        )

        store.dispatch(
          setAuth({
            accessToken: response.metaData.accessToken,
            refreshToken: response.metaData.refreshToken,
            user: response.metaData.user
          })
        )

        processQueue(null, response.metaData.accessToken)
        originalRequest.headers['Authorization'] = 'Bearer ' + response.metaData.accessToken
        return axiosClient(originalRequest)
      } catch (err) {
        processQueue(err, null)
        store.dispatch(logout())
        return Promise.reject(err)
      } finally {
        isRefreshing = false
      }
    }

    return Promise.reject(error)
  }
)

export default axiosClient