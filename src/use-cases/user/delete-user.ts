import { Database } from "../../infra/database"
import { User } from "../../models/user"

export async function deleteUser(userId: number): Promise<void> {
  await Database.getInstance().delete<User>('person', { 
    where: {
      id: userId
    }
   })
}