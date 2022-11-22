import { Knex } from 'knex'

export async function up (knex: Knex): Promise<void> {
  return await knex.schema.createTable('client', function (table) {
    table.increments('id').primary()
    table.string('name', 255).notNullable()
    table.text('address').notNullable()
    table.string('contact_phone', 11).notNullable()
    table.string('cpf', 11).nullable()
    table.string('cnpj', 14).nullable()
  })
}

export async function down (knex: Knex): Promise<void> {
  await knex.schema.dropTable('client')
}
