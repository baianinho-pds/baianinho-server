import { Database } from '@/infra/database'
import { Client } from '@/models/client'

export async function deleteClient (clientId: number): Promise<void> {
  await Database.getInstance().delete<Client>('person', {
    where: { id: clientId }
  })
}
