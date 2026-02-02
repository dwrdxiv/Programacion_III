<template>
  <div class="login-container">
    <h2>Login Básico</h2>
    <form @submit.prevent="handleLogin">
      <input v-model="form.email" type="email" placeholder="Correo Electornico" required />
      <input v-model="form.password" type="password" placeholder="Contraseña" required />
      <button type="submit">Entrar</button>
    </form>

    <p v-if="message" :class="{ 'error': isError }">{{ message }}</p>
    <router-link to="/register">¿No tienes cuenta? Regístrate</router-link>

  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const auth = useAuthStore()
const router = useRouter()
const form = reactive({ email: '', password: '' })
const message = ref('')
const error = ref('')

const handleLogin = async () => {
  const success = await auth.login(form)
  if (success) {
    message.value = '¡Bienvenido de nuevo! Redirigiendo...'
    setTimeout(() => router.push('/'), 2000)
  } else { 
    message.value = error.response?.data?.message || 'Credenciales Incorrectas'
  }
}
</script>

<style scoped>
.login-container { max-width: 400px; margin: 50px auto; padding: 20px; border: 1px solid #ccc; }
.field { margin: 15px 0; }
.error { color: red; }
button { width: 100%; padding: 10px; cursor: pointer; }
input, select { width: 100%; margin-bottom: 10px; padding: 8px; }
</style>