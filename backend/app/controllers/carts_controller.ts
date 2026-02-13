import CartItem from '#models/cart_item'
 // Asegúrate de que esta ruta sea correcta
import type { HttpContext } from '@adonisjs/core/http'

export default class CartsController {
  // Ver carrito y calcular total (40 pts + 20 pts)
  public async index({ auth, response }: HttpContext) {
    const user = auth.getUserOrFail()
    // Cargamos los productos relacionados para tener el precio
    const items = await CartItem.query().where('user_id', user.id).preload('product')
    
    const total = items.reduce((acc, item) => {
      return acc + (Number(item.product.precio) * item.cantidad)
    }, 0)

    return response.ok({ items, total })
  }

  // Agregar al carrito (40 pts)
  public async store({ auth, request, response }: HttpContext) {
    const user = auth.getUserOrFail()
    const { productId, cantidad } = request.only(['productId', 'cantidad'])

    const item = await CartItem.create({
      userId: user.id,
      productId,
      cantidad: cantidad || 1
    })
    return response.created(item)
  }

  // Vaciar carrito (20 pts)
  public async destroy({ auth, response }: HttpContext) {
    const user = auth.getUserOrFail()
    await CartItem.query().where('user_id', user.id).delete()
    return response.ok({ message: 'Carrito vaciado' })
  }
}