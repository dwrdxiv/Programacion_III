import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

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
    }
  ],
})

router.beforeEach((to, from, next) => {
  const auth = useAuthStore()
  const publicPages = ['/login', '/register']
  const authRequired = !publicPages.includes(to.path)

 // if (authRequired && !auth.token) {
 //   return next('/login')
 // }
  
  next()
})

export default router
