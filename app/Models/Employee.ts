import {DateTime} from 'luxon'
import {BaseModel, BelongsTo, belongsTo, column} from '@ioc:Adonis/Lucid/Orm'
import Machine from "App/Models/Machine";
import Company from "App/Models/Company";
import {beforeSave} from "@adonisjs/lucid/build/src/Orm/Decorators";
import Hash from "@ioc:Adonis/Core/Hash";

export default class Employee extends BaseModel {

  @beforeSave()
  public static async hashPassword(employee: Employee) {
    if (employee.$dirty.password) {
      employee.password = await Hash.make(employee.password)
    }
  }

  @column({isPrimary: true})
  public id: number

  @column({serializeAs: 'name', columnName: 'name'})
  public name: string

  @column({serializeAs: 'lastName', columnName: 'last_name'})
  public lastName: string

  @column({serializeAs: 'email', columnName: 'email'})
  public email: string

  @column({serializeAs: null, columnName: 'password'})
  public password: string

  @column({serializeAs: 'docType', columnName: 'doc_type'})
  public docType: string

  @column({serializeAs: 'document', columnName: 'document'})
  public document: string

  @column({serializeAs: 'idCompany', columnName: 'id_company'})
  public idCompany: number
  @belongsTo(() => Company, {foreignKey: 'idCompany'})
  public company: BelongsTo<typeof Company>

  @column({serializeAs: 'idMachine', columnName: 'id_machine'})
  public idMachine: number
  @belongsTo(() => Machine, {foreignKey: 'idMachine'})
  public machine: BelongsTo<typeof Machine>

  @column({serializeAs: 'salary', columnName: 'salary'})
  public salary: number

  @column({serializeAs: 'bonusValuePerHour', columnName: 'bonus_value_per_hour'})
  public bonusValuePerHour: number

  @column.dateTime({autoCreate: true, serializeAs: 'createdAt', columnName: 'created_at'})
  public createdAt: DateTime

  @column.dateTime({autoCreate: true, autoUpdate: true, serializeAs: 'updatedAt', columnName: 'updated_at'})
  public updatedAt: DateTime
}
