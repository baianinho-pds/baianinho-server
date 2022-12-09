import { database } from '../../infra/database'
import { Feedstock } from '../../models'

export async function updateFeedstock (feedstock: Feedstock): Promise<Feedstock> {
  const { id, ...paramsToUpdate } = feedstock
  const updatedFeedStock = await database.feedstockEntity.update({
    where: { id },
    data: {
      ...paramsToUpdate,
      products: {
        connect: paramsToUpdate.products || []
      }
    }
  })

  if (!updatedFeedStock) {
    throw new Error('Server error')
  }

  return updatedFeedStock
}
