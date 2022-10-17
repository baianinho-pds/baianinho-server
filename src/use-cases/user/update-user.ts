import { Database } from '../../infra/database'
import { User } from '../../models/user'


export async function updateUser (user: User): Promise<User> {
  const { id, ...paramsToUpdate } = user
  const updatedUser = await Database.getInstance().update({
    data: paramsToUpdate,
    id,
    table: 'person'
  })

  if (!updatedUser) {
    throw new Error('Server error')
  }

  return updatedUser
}
