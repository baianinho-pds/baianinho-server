import { ClientEntity } from '@/infra/entities'

export async function deleteClient (clientId: number): Promise<void> {
  await ClientEntity.destroy({ where: { id: clientId } })
}
