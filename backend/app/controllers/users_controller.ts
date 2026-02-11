import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class UsersController {
  // Solo para ver la lista
  public async index({ response }: HttpContext) {
    const users = await User.all()
    return response.ok(users)
  }

  // Para cambiar el nivel
  public async updateNivel({ params, request, response }: HttpContext) {
    const user = await User.findOrFail(params.id)
    const { nivel } = request.only(['nivel'])
    
    user.nivel = nivel
    await user.save()
    
    return response.ok({ message: 'Nivel actualizado', user })
  }
}