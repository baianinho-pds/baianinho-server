import { Database } from "../../infra/database"
import { Person } from "../../models/person"

export async function findPerson(userId: number): Promise<Person> {
  const person = await Database.getInstance().findOne<Person>('person', { 
    select: '*',
    where: {
      id: userId
    }
  })

  return person
}