import { database } from '../../infra/database'
import { Person } from '../../models'

export async function findPerson (userId: number): Promise<Person> {
  const person = await database.personEntity.findFirst({
    where: {
      id: userId
    }
  })

  if(!person) {
    throw new Error('Not Found')
  }

  return person
}
