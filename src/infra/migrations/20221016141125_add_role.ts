import { Knex } from 'knex'

export async function up (knex: Knex): Promise<void> {
  return await knex.schema.createTable('role', function (table) {
    table.string('name').primary().notNullable().unique()
  })
}

export async function down (knex: Knex): Promise<void> {
  return await knex.schema.dropTable('role')
}
