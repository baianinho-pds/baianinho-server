import { Database } from "../../infra/database"
import { Person } from "../../models/person"

export async function deletePerson(userId: number): Promise<void> {
  await Database.getInstance().delete<Person>('person', { 
    where: {
      id: userId
    }
  })
}