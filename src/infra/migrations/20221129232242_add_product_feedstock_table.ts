import { Knex } from 'knex'

export async function up (knex: Knex): Promise<void> {
  return await knex.schema.createTable('product_feedstock', function (table) {
    table.integer('product_id').notNullable().references('id').inTable('product')
    table.integer('feedstock_id').notNullable().references('id').inTable('feedstock')
  })
}

export async function down (knex: Knex): Promise<void> {
  return await knex.schema.dropTable('product_feedstock')
}
