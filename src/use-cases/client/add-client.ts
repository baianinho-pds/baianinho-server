import { ClientEntity } from '@/infra/entities'
import { Client } from '@/models'

type AddClientParams = Omit<Client, 'id'>

export async function addClient (params: AddClientParams): Promise<Client> {
  const client = await ClientEntity.create(params)
  return await client.toJSON()
}
