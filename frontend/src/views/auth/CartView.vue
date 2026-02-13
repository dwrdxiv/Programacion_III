<template>
    <div class="header">
        <nav>
        <h1>iCommerce</h1>
        </nav>
        

        <div class="minimenu">
        <button @click="router.push('/')">Inicio</button>
        <button @click="router.push('/products')">Productos</button>
        <button @click="router.push('/cart')">Carrito</button>
    </div>
    </div>
    <div class="background">
            <div class="cart-container">
        <h2>Mi Carrito 🛒</h2>
        <div v-if="cart.items.length > 0">
        <table class="cart-table">
            <tr v-for="item in cart.items" :key="item.id">
            <td>{{ item.product.nombre }}</td>
            <td>{{ item.cantidad }} x ${{ item.product.precio }}</td>
            <td>${{ (item.cantidad * item.product.precio).toFixed(2) }}</td>
            </tr>
        </table>
        <div class="total-section">
            <h3>Total a Pagar: ${{ cart.total.toFixed(2) }}</h3>
            <button @click="cart.clearCart" class="btn-empty">Vaciar Carrito</button>
        </div>
        </div>
        <p v-else>El carrito está vacío.</p>
    </div>

    </div>
  
</template>

<script setup>
import { useCartStore } from '@/stores/cart'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const cart = useCartStore()
onMounted(() => cart.fetchCart())
const router = useRouter()
</script>

<style>
.background {
  min-height: 10vh;
  height: 40rem;
  display:grid;
  justify-content: center;
  align-items: center;
  background-image: linear-gradient(to bottom, #0e191f, #093453);
}
.header { font-family: Arial, sans-serif; padding: 0rem;} 
.header nav { display: flex; justify-content: space-between; padding: .5rem; background: #ffffff; color: rgb(0, 0, 0); }

.minimenu { display: inline-flex; background-color: #e4e4e4; width: 100%;height: 2rem; justify-content: center; gap: 1rem; border-bottom: 2px solid #00ffff; }
.minimenu button { font-family: Arial, sans-serif; border: none;background: none; border: 15; padding: 0.5rem 1rem; cursor: pointer; }
.minimenu button:hover { background: rgb(0, 177, 153); color: rgb(255, 255, 255); border-color: rgb(0, 50, 33); transition-duration: 400ms; }

.cart-container { width: 100%; margin-top: 1rem; padding: 3rem; background-color: white; text-align: center; border-radius: 15px;}
.cart-table td, .cart-table th { border: 1px solid #ddd; padding: .5rem 1rem; border-radius: 5px; }
</style>