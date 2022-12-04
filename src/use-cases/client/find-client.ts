import { ClientEntity } from '@/infra/entities'
import { Client } from '@/models'

export async function findClient (clientId: number): Promise<Client> {
  const client = await ClientEntity.findOne({
    where: { id: clientId }
  })

  return client.toJSON()
}
