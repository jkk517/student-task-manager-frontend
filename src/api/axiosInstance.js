import axios from 'axios'

// central axios instance so we don't repeat the base URL everywhere
const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080/api'
})

// attach the JWT token to every request automatically
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// if the token expires or is invalid, kick the user back to login
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token')
      localStorage.removeItem('username')
      localStorage.removeItem('userId')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default axiosInstance
