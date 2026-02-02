// import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import { registerValidator } from '#validators/register'
import type { HttpContext } from '@adonisjs/core/http'

export default class RegistersController {
  public async store({ request, response }: HttpContext) {
    // 1. Validar datos
    const data = await request.validateUsing(registerValidator)

    // 2. Crear usuario (La clave se encripta sola en el modelo)
    const user = await User.create(data)

    return response.created({
      message: 'Usuario registrado con éxito',
      user: { id: user.id, full_name: user.full_name, email: user.email, nivel: user.nivel }
    })
  }
}
