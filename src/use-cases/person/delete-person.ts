import { database } from '../../infra/database'

export async function deletePerson (userId: number): Promise<void> {
  await database.personEntity.delete({
    where: { id: userId }
  })
}
