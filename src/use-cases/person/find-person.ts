import { PersonEntity } from '@/infra/entities'
import { Person } from '@/models'

export async function findPerson (userId: number): Promise<Person> {
  const person = await PersonEntity.findOne({
    where: {
      id: userId
    }
  })

  return person.toJSON()
}
