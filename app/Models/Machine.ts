import {DateTime} from 'luxon'
import {BaseModel, BelongsTo, belongsTo, column} from '@ioc:Adonis/Lucid/Orm'
import Company from "App/Models/Company";

export default class Machine extends BaseModel {
  @column({isPrimary: true})
  public id: number

  @column({serializeAs: 'brand', columnName: 'brand'})
  public brand: string

  @column({serializeAs: 'model', columnName: 'model'})
  public model: number

  @column({serializeAs: 'location', columnName: 'location'})
  public location: string

  @column({serializeAs: 'serial', columnName: 'serial'})
  public serial: string

  @column({serializeAs: 'idCompany', columnName: 'id_company'})
  public idCompany: number
  @belongsTo(() => Company)
  public company: BelongsTo<typeof Company>

  @column({serializeAs: 'valuePerHour', columnName: 'value_per_hour'})
  public valuePerHour: number

  @column({serializeAs: 'color', columnName: 'color'})
  public color: string

  @column.dateTime({autoCreate: true, serializeAs: 'createdAt', columnName: 'created_at'})
  public createdAt: DateTime

  @column.dateTime({autoCreate: true, autoUpdate: true, serializeAs: 'updatedAt', columnName: 'updated_at'})
  public updatedAt: DateTime
}
