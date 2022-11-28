import { Knex } from 'knex'

export async function up (knex: Knex): Promise<void> {
  return await knex.schema.createTable('person', function (table) {
    table.increments('id').primary()
    table.string('name', 255).notNullable()
    table.string('ctps', 8).notNullable()
    table.string('cpf', 11).notNullable()
    table.date('admission_date').notNullable()
    table.date('demission_date').nullable()
    table.string('contact_phone', 11).notNullable()
    table.string('role_name', 255).notNullable().references('name').inTable('role')
    table.string('sector_name', 255).notNullable().references('name').inTable('sector')
    table.string('city', 255).notNullable()
    table.string('neighborhood', 255).notNullable()
    table.string('street', 255).notNullable()
    table.string('number', 255).notNullable()
    table.string('postal_code', 255).notNullable()
  })
}

export async function down (knex: Knex): Promise<void> {
  return await knex.schema.dropTable('person')
}
