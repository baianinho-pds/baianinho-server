import { Database } from '../../infra/database'
import { Client } from '../../models/client'

export async function findClient (clientId: number): Promise<Client> {
  const client = await Database.getInstance().findOne<Client>('client', {
    select: '*',
    where: {
      id: clientId
    }
  })

  return client
}
