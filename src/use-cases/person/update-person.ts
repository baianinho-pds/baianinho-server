import { Database } from '../../infra/database'
import { Person } from '../../models/person'

export async function updatePerson (person: Person): Promise<Person> {
  const { id, ...paramsToUpdate } = person
  const updatedPerson = await Database.getInstance().update({
    data: paramsToUpdate,
    id,
    table: 'person'
  })

  if (!updatedPerson) {
    throw new Error('Server error')
  }

  return updatedPerson
}
