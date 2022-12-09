import { database } from '../../infra/database'

export async function deleteClient (clientId: number): Promise<void> {
  await database.clientEntity.delete({ where: { id: clientId } })
}
