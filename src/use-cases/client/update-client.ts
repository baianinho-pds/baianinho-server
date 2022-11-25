import { Database } from '../../infra/database'
import { Client } from '../../models/client'

export async function updateClient (client: Client): Promise<Client> {
  const { id, ...paramsToUpdate } = client
  const updatedClient = await Database.getInstance().update({
    data: paramsToUpdate,
    id,
    table: 'client'
  })

  if (!updatedClient) {
    throw new Error('Server error')
  }

  return updatedClient
}
