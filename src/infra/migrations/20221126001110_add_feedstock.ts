import { Knex } from 'knex'

export async function up (knex: Knex): Promise<void> {
  return await knex.schema.createTable('feedstock', function (table) {
    table.increments('id').primary()
    table.string('name', 255).notNullable()
    table.string('supplies_type').notNullable()
    table.string('provider').notNullable()
    table.string('unit').notNullable()
    table.integer('amount')
    table.date('validity')
  })
}

export async function down (knex: Knex): Promise<void> {
  await knex.schema.dropSchema('feedstock')
}
