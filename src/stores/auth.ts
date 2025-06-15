import { defineStore } from 'pinia'
import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api'

interface User {
  id: string
  email: string
  name: string
  role: string
}

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  loading: false
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    loading: false
  }),

  getters: {
    isAdmin: (state) => state.user?.role === 'admin'
  },

  actions: {
    async login(email: string, password: string) {
      try {
        this.loading = true
        const response = await axios.post(`${API_BASE_URL}/auth/login`, {
          email,
          password
        })

        const { token, user } = response.data
        
        this.token = token
        this.user = user
        this.isAuthenticated = true
        
        localStorage.setItem('token', token)
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

        return { success: true, message: 'Connexion réussie!' }
      } catch (error: any) {
        console.error('Erreur de connexion:', error)
        return { 
          success: false, 
          message: error.response?.data?.message || 'Erreur de connexion' 
        }
      } finally {
        this.loading = false
      }
    },

    async register(email: string, password: string, name: string) {
      try {
        this.loading = true
        const response = await axios.post(`${API_BASE_URL}/auth/register`, {
          email,
          password,
          name
        })

        const { token, user } = response.data
        
        this.token = token
        this.user = user
        this.isAuthenticated = true
        
        localStorage.setItem('token', token)
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

        return { success: true, message: 'Inscription réussie!' }
      } catch (error: any) {
        console.error('Erreur d\'inscription:', error)
        return { 
          success: false, 
          message: error.response?.data?.message || 'Erreur d\'inscription' 
        }
      } finally {
        this.loading = false
      }
    },

    async verifyToken() {
      if (!this.token) return

      try {
        const response = await axios.get(`${API_BASE_URL}/auth/verify`)
        this.user = response.data.user
        this.isAuthenticated = true
        axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`
      } catch (error) {
        this.logout()
      }
    },

    logout() {
      this.user = null
      this.token = null
      this.isAuthenticated = false
      localStorage.removeItem('token')
      delete axios.defaults.headers.common['Authorization']
    }
  }
})