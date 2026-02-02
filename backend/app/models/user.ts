import { DateTime } from 'luxon'
import hash from '@adonisjs/core/services/hash'

import { beforeSave } from '@adonisjs/lucid/orm'
import { BaseModel, column } from '@adonisjs/lucid/orm'
//import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'

//const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
//  uids: ['email'],
//  passwordColumnName: 'password',
//})

export default class User extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare full_name: string

  @column()
  declare email: string

  @column({ serializeAs: null })
  declare password: string

  @column()
  declare nivel: 'admin' | 'cliente'


  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  static accessTokens = DbAccessTokensProvider.forModel(User)

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await hash.make(user.password)
    }
  }

}