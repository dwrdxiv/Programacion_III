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

      <section v-if="auth.user?.nivel == 'admin'" class="admin-panel" style="background: rgb(0, 255, 255, 0.2); padding: 1rem; border-radius: 10px; width: 50%; margin: auto;">
        <h2 style="text-align: center; text-decoration: underline;">Panel de Administración</h2>
        <p style="text-align: center;">Aquí puedes gestionar usuarios.</p>

        <table class="user-table" style="width: 100%; border-collapse: collapse; margin-top: 1rem; text-align: center;">
          <thead>
            <tr>
              <th>ID</th>
              <th>Email</th>
              <th>Nivel Actual</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user.id">
              <td>{{ user.id }}</td>
              <td>{{ user.email }}</td>
              <td><span class="badge">{{ user.nivel }}</span></td>
              <td>
                <button 
                  @click="toggleNivel(user)" 
                  class="btn-action"
                  style="font-family: Arial, Helvetica, sans-serif; border-color: rgba(0, 107, 41, 0.592);background: rgb(3, 255, 167); border: 15; border-radius: 10px ; padding: 0.5rem 1rem; cursor: pointer;"
                >
                  Convertir a {{ user.nivel === 'admin' ? 'cliente' : 'admin' }}
            
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      <h1 style="text-align: center; text-decoration: underline;">Informacion</h1>
      <p style="text-align: center;">Proyecto de ejemplo de un e-Commerce<br>
        usando sqlite, Vue, pinia, AdonisJS,<br>
        entre otras tecnologías. <br><br>
      </p>
      <p style="text-align: center; margin-top: 10rem; display: inline;">Edward Quintero <br>C.I: 30.039.529 <br>Programacion III - Seccion 4</p>
    </div>
  </div>

</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import api from '@/services/api'


const auth = useAuthStore()
const router = useRouter()
const users = ref([])

const fetchUsers = async () => {
  if (auth.user?.nivel === 'admin') {
    try {
      const response = await api.get('/auth/users')
      users.value = response.data
    } catch (e) {
      console.error("Error cargando usuarios", e)
    }
  }
}

const toggleNivel = async (user) => {
  const nuevoNivel = user.nivel === 'admin' ? 'cliente' : 'admin'
  try {
    await api.patch(`/auth/users/${user.id}/nivel`, { nivel: nuevoNivel })
    user.nivel = nuevoNivel // Actualizar localmente la tabla
  } catch (e) {
    alert("Error al cambiar nivel")
  }
}
const handleLogout = () => {
  auth.logout()
  router.push('/')
}

onMounted(() => {
  fetchUsers()
})
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
.notuserinfo button {  font-family: Arial, Helvetica, sans-serif; border-color: rgba(0, 107, 41, 0.592);background: rgb(3, 255, 167); border: 15; border-radius: 10px ; padding: 0.5rem 1rem; cursor: pointer; }
.notuserinfo button:hover { background: rgb(0, 177, 153); color: rgb(255, 255, 255); border-color: rgb(0, 50, 33); transition-duration: 400ms; }
</style>