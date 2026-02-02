<template>
  <div class="dashboard">
    <nav>
      <h1>e-commerce</h1>
      <div>
        <span>Bienvenido, {{ auth.user?.email }}</span>
        <button @click="handleLogout">Cerrar Sesión</button>
      </div>
    </nav>
    
    <div class="content">
      <h2>Panel Principal</h2>
      <p>Has ingresado con nivel: <strong>{{ auth.user?.nivel }}</strong></p>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const auth = useAuthStore()
const router = useRouter()

const handleLogout = () => {
  auth.logout()
  router.push('/login')
}
</script>

<style scoped>
nav { display: flex; justify-content: space-between; padding: 1rem; background: #2c3e50; color: white; }
.content { padding: 20px; }
</style>