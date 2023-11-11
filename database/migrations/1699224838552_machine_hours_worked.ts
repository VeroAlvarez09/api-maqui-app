import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'machine_hours_worked'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('id_company').unsigned().references('id').inTable('companies').onDelete('CASCADE')
      table.integer('id_machine').unsigned().references('id').inTable('machines').onDelete('CASCADE')
      table.double('total_hours')
      table.double('value_per_hour')
      table.double('total_value')
      table.date('worked_at').unique()
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', {useTz: true})
      table.timestamp('updated_at', {useTz: true}).notNullable().defaultTo(this.now())
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
