import knex, { Knex } from 'knex'

type FindManyParams<T> = {
  offset: number
  limit: number
  select: Array<keyof T>
  count?: boolean 
}

export type Page<T> = {
  data: T[]
  total?: number
}

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

  public async findMany<T>(table: string, data: FindManyParams<T>): Promise<Page<T>> {
    const items = await this.connection.select(data.select)
      .from(table)
      .offset(data.offset)
      .limit(data.limit)

    if(data.count) {
      const [{ count = 0 }] = await this.connection(table).count<{ count: string }>({ count: '*' })
      return {
        data: items,
        total: count
      }
    } 

    return {
      data: items
    }
  }
}
