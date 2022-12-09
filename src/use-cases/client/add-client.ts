import { database } from '../../infra/database'
import { Client } from '../../models'

type AddClientParams = Omit<Client, 'id'>

export async function addClient (params: AddClientParams): Promise<Client> {
  const client = await database.clientEntity.create({ data: params })
  return client
}
