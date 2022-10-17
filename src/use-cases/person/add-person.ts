import { Database } from '../../infra/database'
import { Person } from '../../models/person'

type AddUserParams = Omit<Person, 'id' | 'demissionDate'>

export async function addPerson (params: AddUserParams): Promise<Person> {
  const person = await Database.getInstance().insert('person', params)

  if (!person) {
    throw new Error('Server error')
  }

  return person
}
