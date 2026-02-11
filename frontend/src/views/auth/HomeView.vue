<template>
  <div class="header">
    <nav>
      <h1>iCommerce</h1>
      
      <div v-if="auth.user" class="userinfo">
        <button @click="handleLogout">Cerrar Sesión</button>
      </div>

      <div v-else class="notuserinfo">
        <button @click="router.push('/login')">Iniciar Sesion</button>
      </div>
    </nav>
    

    <div class="minimenu">
      <button @click="router.push('/')">Inicio</button>
      <button>Productos</button>
      <button>Carrito</button>
    </div>


    <div class="content">
      <p v-if="auth.user">Bienvenido, <strong>{{auth.user?.full_name}}</strong>. Has ingresado como: <strong>{{ auth.user?.nivel }}</strong></p>
      <p v-else>¿Listo para empezar? Inicia sesión para continuar.</p> <br>

      <h1 style="text-align: center; text-decoration: underline;">Informacion</h1>
      <p style="text-align: center;">Proyecto de ejemplo de un e-Commerce<br>
        usando sqlite, Vue, pinia, AdonisJS,<br>
        entre otras tecnologías. <br><br>
      </p>
      <p style="text-align: center; margin-top: 10rem;">Edward Quintero <br>C.I: 30.039.529 <br>Programacion III - Seccion 4</p>
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
  router.push('/')
}
</script>

<style scoped>
.header { font-family: Arial, sans-serif; padding: 0rem;}
nav { display: flex; justify-content: space-between; padding: .5rem; background: #ffffff; color: rgb(0, 0, 0); }

.minimenu { display: inline-flex; background-color: #e4e4e4; width: 100%;height: 2rem; justify-content: center; gap: 1rem; border-bottom: 2px solid #00ffff; }
.minimenu button { font-family: Arial, sans-serif; border: none;background: none; border: 15; padding: 0.5rem 1rem; cursor: pointer; }
.minimenu button:hover { background: rgb(0, 177, 153); color: rgb(255, 255, 255); border-color: rgb(0, 50, 33); transition-duration: 400ms; }

.content { padding: 1rem; background-image: linear-gradient(to bottom, #0e191f, #093453); color: rgb(255, 255, 255); height: 40rem; }

.userinfo {padding: 1rem; display: flex; }
.userinfo button {  font-family: Arial, Helvetica, sans-serif; border-color: #ffaaaa;background: rgb(154, 35, 45);color: white; border: 15; border-radius: 10px ; padding: 0.5rem 1rem; cursor: pointer; }
.userinfo button:hover { background: rgb(255, 52, 59); color: rgb(255, 255, 255); border-color: rgb(222, 48, 62); transition-duration: 400ms; }

.notuserinfo {padding: 1rem; display: flex; }
.notuserinfo button {  font-family: Arial, Helvetica, sans-serif; border-color: rgb(0, 107, 41);background: rgb(3, 255, 167); border: 15; border-radius: 10px ; padding: 0.5rem 1rem; cursor: pointer; }
.notuserinfo button:hover { background: rgb(0, 177, 153); color: rgb(255, 255, 255); border-color: rgb(0, 50, 33); transition-duration: 400ms; }
</style>