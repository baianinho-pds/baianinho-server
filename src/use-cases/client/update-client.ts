import { database } from '../../infra/database'
import { Client } from '../../models/client'

export async function updateClient (client: Client): Promise<Client> {
  const { id, ...paramsToUpdate } = client
  const a = await database.clientEntity.update({
    where: { id },
    data: paramsToUpdate
  })

  if (!a) {
    throw new Error('Server error')
  }

  return a
}
