import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('sector', function(table) {
    table.string('name', 255).primary().notNullable().unique()
  })
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('sector')
}
