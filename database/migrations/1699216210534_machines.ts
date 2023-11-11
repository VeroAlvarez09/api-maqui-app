import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'machines'

  public async up () {
    this.schema.createTable(this.tableName,(table) => {
      table.increments('id').primary()
      table.string('name')
      table.string('brand')
      table.integer('model')
      table.string('location')
      table.string('serial').unique()
      table.integer('id_company').unsigned().references('id').inTable('companies').onDelete('CASCADE')
      table.double('value_per_hour')
      table.string('color')
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true }).notNullable().defaultTo(this.now())
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
