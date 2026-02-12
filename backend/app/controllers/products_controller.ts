import Product from '#models/product'
import type { HttpContext } from '@adonisjs/core/http'

export default class ProductsController {
  // Ver todos los productos (60 pts)
  public async index({ response }: HttpContext) {
    const products = await Product.all()
    return response.ok(products)
  }

  // Crear producto - Solo Admin (60 pts + 25 pts de protección)
  public async store({ request, response, auth }: HttpContext) {
    // Protección con login y nivel (25 pts)
    const user = auth.user
    if (!user || user.nivel !== 'admin') {
      return response.forbidden({ message: 'No tienes permisos de administrador' })
    }

    const data = request.only(['nombre', 'codigo', 'precio', 'descripcion'])

    // Validación precio > 0 (15 pts)
    if (data.precio <= 0) {
      return response.badRequest({ message: 'El precio debe ser mayor a 0' })
    }

    const product = await Product.create(data)
    return response.created(product)
  }

  // Ver un producto por código (60 pts)
  public async show({ params, response }: HttpContext) {
    const product = await Product.findByOrFail('codigo', params.id)
    return response.ok(product)
  }

  public async destroy({ params, response, auth }: HttpContext) {
  if (auth.user?.nivel !== 'admin') return response.forbidden()
  
  const product = await Product.findOrFail(params.id)
  await product.delete()
  return response.ok({ message: 'Producto eliminado' })
}
public async update({ params, request, response, auth }: HttpContext) {
  if (auth.user?.nivel !== 'admin') return response.forbidden()

  const product = await Product.findOrFail(params.id)
  const data = request.only(['nombre', 'precio', 'descripcion'])

  // Validación de precio > 0 (15 pts)
  if (data.precio <= 0) return response.badRequest({ message: 'Precio inválido' })

  product.merge(data)
  await product.save()
  return response.ok(product)
}
}