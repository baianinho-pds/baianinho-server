import knex, { Knex } from 'knex'

export class Database {
  private static instance: Database
  private readonly connection: Knex

  constructor () {
    this.connection = knex({
      client: 'pg',
      connection: {
        host: 'baianinho_db',
        user: 'postgres',
        password: 'postgres',
        database: 'baianinhodb',
        port: 5432
      }
    })
  }

  public static getInstance (): Database {
    if (!Database.instance) {
      Database.instance = new Database()
    }

    return Database.instance
  }

  public async insert<T>(table: string, data: T): Promise< T & { id: number }> {
    const [item] = await this.connection.insert(data)
      .returning('*')
      .into(table)

    return item
  }
}
