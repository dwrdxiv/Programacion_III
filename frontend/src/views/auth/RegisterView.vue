<template>
  <div class="auth-container">

    <h2>Registro de Usuario</h2>
    <form @submit.prevent="handleRegister">
      <input v-model="form.email" type="email" placeholder="Correo electrónico" required />
      <input v-model="form.full_name" type="text" placeholder="Nombre y Apellido" required />
      <input v-model="form.password" type="password" placeholder="Contraseña (mín. 8 caracteres)" required />
      
     <!-- <div class="field">
        <label>Nivel de acceso:</label>
        <select v-model="form.nivel">
          <option value="usuario">Usuario</option>
          <option value="admin">Admin</option>
        </select>
      </div> -->

      <button type="submit" :disabled="loading">Registrar</button>
    </form>
    
    <p v-if="message" :class="{ 'error': isError }">{{ message }}</p>
    <router-link to="/login">¿Ya tienes cuenta? Inicia sesión</router-link>
  </div>
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
.auth-container { max-width: 400px; margin: 50px auto; padding: 20px; border: 1px solid #ccc; }
.field { margin: 15px 0; }
.error { color: red; }
button { width: 100%; padding: 10px; cursor: pointer; }
input, select { width: 100%; margin-bottom: 10px; padding: 8px; }
</style>