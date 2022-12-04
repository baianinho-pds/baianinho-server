import { PersonEntity } from '@/infra/entities'

export async function deletePerson (userId: number): Promise<void> {
  await PersonEntity.destroy({
    where: { id: userId }
  })
}
