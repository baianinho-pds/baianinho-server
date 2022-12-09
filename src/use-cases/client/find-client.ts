import { database } from '../../infra/database'
import { Client } from '../../models'

export async function findClient (clientId: number): Promise<Client> {
  const client = await database.clientEntity.findFirst({
    where: { id: clientId }
  })

  if(!client) {
    throw new Error('Not Found')
  }

  return client
}
