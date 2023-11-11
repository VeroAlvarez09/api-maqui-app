import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Company extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column({serializeAs: 'businessName', columnName: 'business_name'})
  public businessName: string

  @column({serializeAs: 'phone', columnName: 'phone'})
  public phone: number

  @column({serializeAs: 'email', columnName: 'email'})
  public email: string

  @column({serializeAs: 'direction', columnName: 'direction'})
  public direction: string

  @column.dateTime({autoCreate: true, serializeAs: 'createdAt', columnName: 'created_at'})
  public createdAt: DateTime

  @column.dateTime({autoCreate: true, autoUpdate: true, serializeAs: 'updatedAt', columnName: 'updated_at'})
  public updatedAt: DateTime
}
