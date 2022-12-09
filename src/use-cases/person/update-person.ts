import { database } from '../../infra/database'
import { Person } from '../../models'

export async function updatePerson (person: Person): Promise<Person> {
  const { id, ...paramsToUpdate } = person
  const updatedPerson = await database.personEntity.update({
    where: { id },
    data: paramsToUpdate
  })

  if (!updatedPerson) {
    throw new Error('Server error')
  }

  return updatedPerson
}
