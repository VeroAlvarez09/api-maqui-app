import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'employees'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('name')
      table.string('last_name')
      table.string('doc_type')
      table.string('document').unique()
      table.string('email')
      table.string('password')
      table.integer('id_company').unsigned().references('id').inTable('companies').onDelete('CASCADE')
      table.integer('id_machine').unsigned().references('id').inTable('machines').onDelete('CASCADE')
      table.double('salary')
      table.double('bonus_value_per_hour')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true }).notNullable().defaultTo(this.now())
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
