import { Knex } from "knex"

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("sector").del()

    // Inserts seed entries
    await knex("sector").insert([
        { name: 'internal' },
        { name: 'external' }
    ])
}
