import vine from '@vinejs/vine'

export const registerValidator = vine.compile(
  vine.object({
    email: vine.string().email().unique({ table: 'users', column: 'email' }),
    full_name: vine.string().minLength(3).maxLength(100),
    password: vine.string().minLength(8),
    nivel: vine.enum(['admin', 'cliente'])
  })
)