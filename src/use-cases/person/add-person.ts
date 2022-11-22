import { Database } from '../../infra/database'
import { Person } from '../../models/person'

type AddUserParams = Omit<Person, 'id' | 'demissionDate'>

export async function addPerson (params: AddUserParams): Promise<Person> {
  const person = await Database.getInstance().insert('person', params)

  return person
}
