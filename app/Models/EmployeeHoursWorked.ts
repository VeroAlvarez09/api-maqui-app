import {DateTime} from 'luxon'
import {BaseModel, BelongsTo, belongsTo, column} from '@ioc:Adonis/Lucid/Orm'
import Company from "App/Models/Company";
import Employee from "App/Models/Employee";

export default class EmployeeHoursWorked extends BaseModel {
  @column({isPrimary: true})
  public id: number

  @column({serializeAs: 'idCompany', columnName: 'id_company'})
  public id_company: number
  @belongsTo(() => Company)
  public company: BelongsTo<typeof Company>

  @column({serializeAs: 'idEmployee', columnName: 'id_employee'})
  public id_employee: number
  @belongsTo(() => Employee)
  public employee: BelongsTo<typeof Employee>

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
