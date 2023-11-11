import {DateTime} from 'luxon'
import {
  BaseModel, column, belongsTo,
  BelongsTo
} from '@ioc:Adonis/Lucid/Orm'
import Company from "App/Models/Company";
import Machine from "App/Models/Machine";

export default class MachineHoursWorked extends BaseModel {
  @column({isPrimary: true})
  public id: number

  @column({serializeAs: 'idCompany', columnName: 'id_company'})
  public id_company: number
  @belongsTo(() => Company)
  public company: BelongsTo<typeof Company>

  @column({serializeAs: 'idMachine', columnName: 'id_machine'})
  public id_machine: number
  @belongsTo(() => Machine)
  public machine: BelongsTo<typeof Machine>

  @column({serializeAs: 'totalHours', columnName: 'total_hours'})
  public total_hours: number

  @column({serializeAs: 'valuePerHour', columnName: 'value_per_hour'})
  public value_per_hour: number

  @column({serializeAs: 'totalValue', columnName: 'total_value'})
  public total_value: number

  @column.date({serializeAs: 'workedAt', columnName: 'worked_at'})
  public worked_at: DateTime

  @column.dateTime({autoCreate: true, serializeAs: 'createdAt', columnName: 'created_at'})
  public createdAt: DateTime

  @column.dateTime({autoCreate: true, autoUpdate: true, serializeAs: 'updatedAt', columnName: 'updated_at'})
  public updatedAt: DateTime
}
