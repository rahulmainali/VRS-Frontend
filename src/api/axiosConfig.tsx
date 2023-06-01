import axios, { AxiosInstance, AxiosError, AxiosRequestConfig } from 'axios'

const axiosConfig: AxiosInstance = axios.create({
  baseURL:
    process.env.NODE_ENV === 'production'
      ? 'https://sadhan.com.np'
      : 'http://localhost:5000/api',

  timeout: 5000,

  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json'
  },
  withCredentials: true
})

// for JWT refresh
let refreshToken: string | null = null

axiosConfig.interceptors.request.use(
  async (config: AxiosRequestConfig) => {
    if (config.url?.endsWith('/token')) {
      return config
    }
    const tokenResponse: any = await axiosConfig.get('/token')
    const accessToken = tokenResponse.data.accessToken
    refreshToken = tokenResponse.data.refreshToken

    // setting the JWT token in axios headers

    axiosConfig.defaults.headers.common[
      'Authorization'
    ] = `Bearer ${accessToken}`
    return config
  },
  async (error: AxiosError) => {
    return Promise.reject(error)
  }
)

axiosConfig.interceptors.response.use(
  async response => {
    // handle successful response
    return response
  },
  async (error: AxiosError) => {
    // handle error response
    const originalRequest: any = error.config

    // if error is due to JWT
    if (error.response?.status === 401 && !originalRequest?._retry) {
      originalRequest._retry = true

      try {
        console.log('handling renew token')
        const refreshTokenResponse: any = await axiosConfig.post('/renewToken', {
          refreshToken: refreshToken
        })
        const accessToken = refreshTokenResponse?.data?.accessToken
        axiosConfig.defaults.headers.common[
          'Authorization'
        ] = `Bearer ${accessToken}`

        console.log('new renew token ' + refreshToken)

        // retry the original request

        return axiosConfig(originalRequest)
      } catch (error) {
        // if refreshing token fails
        console.error(error)
        return Promise.reject(error)
      }
    }
  }
)

export default axiosConfig
