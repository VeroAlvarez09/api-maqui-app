import {DateTime} from 'luxon'
import {
  BaseModel, column, belongsTo,
  BelongsTo
} from '@ioc:Adonis/Lucid/Orm'
import Company from "App/Models/Company";
import Machine from "App/Models/Machine";
import Employee from "App/Models/Employee";

export default class MachineHoursWorked extends BaseModel {
  public static table = 'machine_hours_worked'

  @column({isPrimary: true})
  public id: number

  @column({serializeAs: 'idCompany', columnName: 'id_company'})
  public idCompany: number
  @belongsTo(() => Company, {foreignKey: 'idCompany'})
  public company: BelongsTo<typeof Company>

  @column({serializeAs: 'idEmployee', columnName: 'id_employee'})
  public idEmployee: number
  @belongsTo(() => Employee, {foreignKey: 'idEmployee'})
  public employee: BelongsTo<typeof Employee>

  @column({serializeAs: 'idMachine', columnName: 'id_machine'})
  public idMachine: number
  @belongsTo(() => Machine, {foreignKey: 'idMachine'})
  public machine: BelongsTo<typeof Machine>

  @column({serializeAs: 'totalHours', columnName: 'total_hours'})
  public totalHours: number

  @column({serializeAs: 'valuePerHour', columnName: 'value_per_hour'})
  public valuePerHour: number

  @column({serializeAs: 'totalValue', columnName: 'total_value'})
  public totalValue: number

  @column.date({serializeAs: 'workedAt', columnName: 'worked_at'})
  public workedAt: DateTime

  @column.dateTime({autoCreate: true, serializeAs: 'createdAt', columnName: 'created_at'})
  public createdAt: DateTime

  @column.dateTime({autoCreate: true, autoUpdate: true, serializeAs: 'updatedAt', columnName: 'updated_at'})
  public updatedAt: DateTime
}
