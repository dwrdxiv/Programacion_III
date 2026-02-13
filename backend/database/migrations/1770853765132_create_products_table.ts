import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'products'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
    table.increments('id')
    table.string('nombre').notNullable()
    table.string('codigo').notNullable().unique() // Código único
    table.decimal('precio', 10, 2).notNullable()
    table.integer('unidades').notNullable().defaultTo(0)
    table.text('descripcion').nullable()
    table.timestamp('created_at')
    table.timestamp('updated_at')
  })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}