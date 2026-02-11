<template>
  <body class="background">
    
  
    <div class="auth-container">
      <h2>Registro de Usuario</h2>
      <form @submit.prevent="handleRegister">
        <input v-model="form.email" type="email" placeholder="Correo electrónico" required />
        <input v-model="form.full_name" type="text" placeholder="Nombre y Apellido" required />
        <input v-model="form.password" type="password" placeholder="Contraseña (mín. 8 caracteres)" required />
        <button type="submit" :disabled="loading">Registrar</button>
      </form>
      
      <p v-if="message" :class="{ 'error': isError }">{{ message }}</p>
      <br>
      <router-link to="/login" class="goLogin">¿Ya tienes cuenta? Inicia sesión</router-link>
      <button class="volver" @click="router.push('/')" style="margin: auto;">Volver</button>

    </div>
  </body>
</template>

<script setup>
import { reactive, ref } from 'vue'
import api from '@/services/api'
import { useRouter } from 'vue-router'

const router = useRouter()
const form = reactive({
  email: '',
  full_name: '',
  password: '',
  nivel: 'cliente' // Valor por defecto
})

const message = ref('')
const isError = ref(false)
const loading = ref(false)

const handleRegister = async () => {
  loading.value = true
  try {
    await api.post('/auth/register', form)
    isError.value = false
    message.value = '¡Usuario creado con éxito! Redirigiendo...'
    
    // Redirigir al login después de 2 segundos
    setTimeout(() => router.push('/login'), 2000)
  } catch (error) {
    isError.value = true
    message.value = error.response?.data?.message || 'Error al registrar'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.background { background-image: linear-gradient(to bottom, #0e191f, #093453); height: 60rem; display: flex; align-items: center;}
.auth-container {width: 20rem; height: 22rem; margin: auto; margin-top: 100px; padding: 3rem; border: 2px solid #29dbff; border-radius: 10px; background: #ffffff; text-align: center; }
.error { color: red; }
.auth-container button { font-family: Arial, Helvetica, sans-serif; border-color: rgb(0, 107, 41);background: rgb(3, 255, 167); border: 15; border-radius: 10px ; padding: 0.5rem 1rem; cursor: pointer; width: 90%; padding: 0.5rem; cursor: pointer; margin-top: 1rem; }
.auth-container button:hover { background: rgb(0, 177, 153); color: rgb(255, 255, 255); border-color: rgb(0, 50, 33); transition-duration: 400ms; }
input, select { width: 90%; margin-bottom: 1rem; padding: 0.5rem; }

.auth-container .volver {width: 50%; background: none; border: none; margin-top: 1rem; color: rgb(0, 65, 98); cursor: pointer; text-decoration: none; }
.auth-container .volver:hover {background-color: gray; color: rgb(255, 255, 255); transition-duration: 400ms; }

.goLogin { font-family: Arial, Helvetica, sans-serif; color: rgb(0, 65, 98); background: none; border: none; cursor: pointer; text-decoration: none; }
.goLogin:hover { color: rgb(0, 0, 0); transition-duration: 200ms; font-size: 1.1rem; }
</style>