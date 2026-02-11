<template>
  <body class="background">
    

    <div class="login-container">
      <h2>Inicia Sesión</h2>
      <form @submit.prevent="handleLogin">
        <input v-model="form.email" type="email" placeholder="Correo Electornico" required />
        <input v-model="form.password" type="password" placeholder="Contraseña" required />
        <button type="submit">Entrar</button>
      </form>

      <p v-if="message" :class="{ 'error': isError }">{{ message }}</p><br>
      <router-link to="/register" class="goRegister">¿No tienes cuenta? Regístrate</router-link>
      
      <button class="volver" @click="router.push('/')" style="margin: auto;">Volver</button>
    </div>

    
  </body>
  
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
.background { background-image: linear-gradient(to bottom, #0e191f, #093453); height: 60rem; display: flex; align-items: center;}
.login-container {width: 20rem; height: 20rem; margin: auto; margin-top: 100px; padding: 3rem; border: 2px solid #29dbff; border-radius: 10px; background: #ffffff; text-align: center; }
.error { color: red; }
.login-container button { font-family: Arial, Helvetica, sans-serif; border-color: rgb(0, 107, 41);background: rgb(3, 255, 167); border: 15; border-radius: 10px ; padding: 0.5rem 1rem; cursor: pointer; width: 90%; padding: 0.5rem; cursor: pointer; margin-top: 1rem; }
.login-container button:hover { background: rgb(0, 177, 153); color: rgb(255, 255, 255); border-color: rgb(0, 50, 33); transition-duration: 400ms; }
input, select { width: 90%; margin-bottom: 1rem; padding: 0.5rem; }

.login-container .volver {width: 50%; background: none; border: none; margin-top: 1rem; color: rgb(0, 65, 98); cursor: pointer; text-decoration: none; }
.login-container .volver:hover {background-color: gray; color: rgb(255, 255, 255); transition-duration: 400ms; }

.goRegister { font-family: Arial, Helvetica, sans-serif; color: rgb(0, 65, 98); background: none; border: none; cursor: pointer; text-decoration: none; }
.goRegister:hover { color: rgb(0, 0, 0); transition-duration: 200ms; font-size: 1.1rem; }
</style>