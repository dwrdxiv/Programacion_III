import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const handleLogin = async () => {
  const success = await auth.login(form) // 1. Espera a que Pinia guarde el token
  if (success) {
    console.log("Login exitoso, redirigiendo...")
    await router.push('/') // 2. Ahora sí intenta entrar
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/auth/LoginView.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/auth/RegisterView.vue'),
    },
    {
      path: '/',
      name: 'home',
      component: () => import('../views/auth/HomeView.vue'),
    },
    {
      path: '/products',
      name: 'products',
      component: () => import('../views/auth/ProductListView.vue'),
    },{
    path: '/cart',
    name: 'cart',
    component: () => import('../views/auth/CartView.vue')}
  ],
})

router.beforeEach((to, from, next) => {
  const auth = useAuthStore()
  const isAuthenticated = !!auth.token || !!localStorage.getItem('token') // Doble chequeo

  if (to.path === '/' && !isAuthenticated) {
    console.log("Bloqueado por el guard: No hay token")
    next('/login')
  } else {
    next()
  }
})

export default router
