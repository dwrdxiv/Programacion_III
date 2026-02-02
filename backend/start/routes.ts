/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

// Importamos los controladores
const RegistersController = () => import('#controllers/registers_controller')
const LoginsController = () => import('#controllers/login_controller')

router.group(() => {
  router.post('register', [RegistersController, 'store'])
  router.post('login', [LoginsController, 'store'])
}).prefix('auth')

router.get('/', async () => {
  return {
    hello: 'world',
  }
})
