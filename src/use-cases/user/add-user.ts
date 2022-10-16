import { Database } from '../../infra/database'
import { User } from '../../models/user'

type AddUserParams = Omit<User, 'id' | 'demissionDate'>

export async function addUser (params: AddUserParams): Promise<User> {
  const user = await Database.getInstance().insert('person', params)

  if (!user) {
    throw new Error('Server error')
  }

  return user
}
