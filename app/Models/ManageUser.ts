import {DateTime} from 'luxon'
import {BaseModel, column} from '@ioc:Adonis/Lucid/Orm'
import {beforeSave} from "@adonisjs/lucid/build/src/Orm/Decorators";
import Hash from "@ioc:Adonis/Core/Hash";

export default class ManageUser extends BaseModel {

  @beforeSave()
  public static async hashPassword(user: ManageUser) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }

  @column({isPrimary: true, columnName: 'id'})
  public id: number

  @column({serializeAs: 'username', columnName: 'username'})
  public username: string

  @column({serializeAs: 'email', columnName: 'email'})
  public email: string

  @column({serializeAs: null, columnName: 'password'})
  public password: string

  @column({serializeAs: 'name', columnName: 'name'})
  public name: string

  @column({serializeAs: 'lastName', columnName: 'last_name'})
  public lastName: string

  @column({serializeAs: 'active', columnName: 'active'})
  public active: boolean | true

  @column({serializeAs: "avatarUrl", columnName: 'avatar_url'})
  public avatarUrl: string | null

  @column.dateTime({autoCreate: true, serializeAs: 'createdAt', columnName: 'created_at'})
  public createdAt: DateTime

  @column.dateTime({autoCreate: true, autoUpdate: true, serializeAs: 'updatedAt', columnName: 'updated_at'})
  public updatedAt: DateTime
}
