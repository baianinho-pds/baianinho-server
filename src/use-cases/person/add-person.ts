import { PersonEntity } from '@/infra/entities'
import { Person } from '@/models'

type AddUserParams = Omit<Person, 'id' | 'demissionDate'>

export async function addPerson (params: AddUserParams): Promise<Person> {
  const person = await PersonEntity.create(params)
  return person.toJSON()
}
