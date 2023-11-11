import {DateTime} from 'luxon'
import {BaseModel, BelongsTo, belongsTo, column} from '@ioc:Adonis/Lucid/Orm'
import Company from "App/Models/Company";
import ManageUser from "App/Models/ManageUser";

export default class CompaniesManageUser extends BaseModel {
  @column({isPrimary: true})
  public id: number

  @column({serializeAs: 'idCompany', columnName: 'id_company'})
  public idCompany: number
  @belongsTo(() => Company)
  public company: BelongsTo<typeof Company>

  @column({serializeAs: 'idManageUser', columnName: 'id_manage_user'})
  public idManageUser: number
  @belongsTo(() => ManageUser)
  public manageUser: BelongsTo<typeof ManageUser>

  @column.dateTime({autoCreate: true, serializeAs: 'createdAt', columnName: 'created_at'})
  public createdAt: DateTime

  @column.dateTime({autoCreate: true, autoUpdate: true, serializeAs: 'updatedAt', columnName: 'updated_at'})
  public updatedAt: DateTime
}
