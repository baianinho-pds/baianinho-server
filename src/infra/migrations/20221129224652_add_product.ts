import { Knex } from 'knex'

export async function up (knex: Knex): Promise<void> {
  return await knex.schema.createTable('product', function (table) {
    table.increments('id').primary()
    table.string('name', 255).notNullable()
    table.integer('batch_code').notNullable()
    table.integer('grammage').notNullable()
    table.integer('quantity').notNullable()
    table.decimal('price', 12, 2).notNullable()
    table.date('production_date').notNullable()
    table.date('expiration_date').notNullable()
  })
}

export async function down (knex: Knex): Promise<void> {
  await knex.schema.dropTable('product')
}
