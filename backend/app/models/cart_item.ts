import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Product from '#models/product' // Asegúrate de que esta ruta sea correcta

export default class CartItem extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare userId: number

  @column()
  declare productId: number

  @column()
  declare cantidad: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  // Relación con el modelo Product
  @belongsTo(() => Product)
  declare product: BelongsTo<typeof Product>
}