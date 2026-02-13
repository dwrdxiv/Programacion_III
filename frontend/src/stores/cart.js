import { defineStore } from 'pinia'
import api from '../services/api'

export const useCartStore = defineStore('cart', {
  state: () => ({ 
    items: [], 
    total: 0 
  }),
  actions: {
    async fetchCart() {
      try {
        const res = await api.get('/api/cart')
        this.items = res.data.items
        this.total = res.data.total
      } catch (error) {
        console.error("Error al obtener el carrito:", error)
      }
    },
    async addToCart(productId) {
      try {
        await api.post('/api/cart', { productId, cantidad: 1 })
        await this.fetchCart() // Recarga los datos para actualizar el total
      } catch (error) {
        console.error("Error al agregar al carrito:", error)
      }
    },
    async clearCart() {
      try {
        await api.delete('/api/cart')
        this.items = []
        this.total = 0
      } catch (error) {
        console.error("Error al vaciar el carrito:", error)
      }
    }
  }
})