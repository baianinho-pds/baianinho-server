import { Database } from "../../infra/database"
import { User } from "../../models/user"

export async function findUser(userId: number): Promise<User> {
  const user = await Database.getInstance().findOne<User>('person', { 
    select: '*',
    where: {
      id: userId
    }
   })

  return user
}