import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('sector', function(table) {
    table.string('name', 255).primary().notNullable().unique()
  })
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('sector')
}


// table.increments('id')
//     table.string('name', 255)
//     table.string('ctps', 8)
//     table.string('cpf', 11)
//     table.date('admission_date')
//     table.string('contact_phone', 11)
//     table.string('role')