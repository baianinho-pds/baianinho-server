import { ClientEntity } from '@/infra/entities'
import { Client } from '@/models/client'

export async function updateClient (client: Client): Promise<Client> {
  const { id, ...paramsToUpdate } = client
  const [affected, updatedClient] = await ClientEntity.update(paramsToUpdate, {
    where: { id },
    returning: true
  })

  if (!affected) {
    throw new Error('Server error')
  }

  return updatedClient[0].toJSON()
}
