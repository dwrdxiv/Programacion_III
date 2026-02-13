/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

// Importamos los controladores
const RegistersController = () => import('#controllers/registers_controller')
const LoginsController = () => import('#controllers/login_controller')
const UsersController = () => import('#controllers/users_controller')
const ProductsController = () => import('#controllers/products_controller')
const CartsController = () => import('#controllers/carts_controller')

router.group(() => {
  router.post('register', [RegistersController, 'store'])
  router.post('login', [LoginsController, 'store'])
  router.get('users', [UsersController, 'index'])
  router.patch('users/:id/nivel', [UsersController, 'updateNivel'])
}).prefix('auth')

router.group(() => {
  router.get('products', [ProductsController, 'index'])
  router.get('products/:id', [ProductsController, 'show'])
  router.post('products', [ProductsController, 'store']).use(middleware.auth())
  router.put('products/:id', [ProductsController, 'update']).use(middleware.auth()) // Para editar
  router.delete('products/:id', [ProductsController, 'destroy']).use(middleware.auth()) // Para borrar
}).prefix('api')

router.group(() => {
  // Ver el carrito y el total calculado (40 pts + 20 pts)
  router.get('cart', [CartsController, 'index'])
  
  // Agregar un producto al carrito (40 pts)
  router.post('cart', [CartsController, 'store'])
  
  // Vaciar el carrito (20 pts)
  router.delete('cart', [CartsController, 'destroy'])
}).prefix('api').use(middleware.auth()) // Importante: Todo el carrito requiere login

router.get('/', async ({ response }) => {
  return response.ok({ message: 'Bienvenido a iCommerce API' }) })



// Dentro del grupo de rutas 'auth' o en uno nuevo
 // Obtener todos
 // Cambiar nivel
