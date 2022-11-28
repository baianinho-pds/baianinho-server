import { Database } from '@/infra/database'
import { Client } from '@/models/client'

type AddClientParams = Omit<Client, 'id'>

export async function addClient (params: AddClientParams): Promise<Client> {
  const client = await Database.getInstance().insert('client', params)

  return client
}
