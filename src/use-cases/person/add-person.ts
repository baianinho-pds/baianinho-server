import { database } from '../../infra/database'
import { Person } from '../../models'

type AddUserParams = Omit<Person, 'id' | 'demissionDate'>

export async function addPerson (params: AddUserParams): Promise<Person> {
  const person = await database.personEntity.create({
    data: params
  })

  return person
}
