import { PersonEntity } from '@/infra/entities'
import { Person } from '@/models'

export async function updatePerson (person: Person): Promise<Person> {
  const { id, ...paramsToUpdate } = person
  const [affected, updatedPerson] = await PersonEntity.update(paramsToUpdate, {
    where: { id },
    returning: true
  })

  if (!affected) {
    throw new Error('Server error')
  }

  return updatedPerson[0].toJSON()
}
