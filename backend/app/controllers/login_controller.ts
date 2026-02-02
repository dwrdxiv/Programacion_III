// import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'
import hash from '@adonisjs/core/services/hash'

export default class LoginsController {
  public async store({ request, response }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])

    // 1. Buscamos al usuario por email
    const user = await User.findBy('email', email)

    // 2. Si no existe o la clave no coincide
    if (!user || !(await hash.verify(user.password, password))) {
      return response.unauthorized({ message: 'Credenciales inválidas' })
    }

    // 3. Generar el token (esto usa la relación configurada en config/auth.ts)
    const token = await User.accessTokens.create(user)

    return response.ok({
      message: 'Login exitoso',
      token: token.value!.release(),
      user: {
        id: user.id,
        email: user.email,
        nivel: user.nivel
      }
    })
  }
}