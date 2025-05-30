import axios from "axios"

const AxiosInstance = axios.create({
  baseURL: "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
})

// Sets the access token in the header for all requests
AxiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// If the access token is expired, refresh it
AxiosInstance.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    const originalRequest = error.config

    // If the error is 401 and we haven't tried to refresh the token yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        const refreshToken = localStorage.getItem("refresh_token")
        if (!refreshToken) {
          // No refresh token available, redirect to login
          window.location.href = "/login"
          return Promise.reject(error)
        }

        // Try to refresh the token
        const response = await AxiosInstance.post("/token/refresh/", { refresh: refreshToken })
        const { access } = response.data

        // Update the access token in localStorage
        localStorage.setItem("access_token", access)

        // Update the authorization header
        originalRequest.headers.Authorization = `Bearer ${access}`

        // Retry the original request
        return AxiosInstance(originalRequest)
      } catch (refreshError) {
        // If refresh token is invalid or expired, clear tokens and redirect to login
        localStorage.removeItem("access_token")
        localStorage.removeItem("refresh_token")
        window.location.href = "/login"
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  }
)

export default AxiosInstance