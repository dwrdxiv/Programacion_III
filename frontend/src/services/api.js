import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3333', // La URL por defecto de Adonis
  headers: {
    'Content-Type': 'application/json'
  }
})

// Bonus: Si ya tienes un token, lo incluimos en cada petición
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default api