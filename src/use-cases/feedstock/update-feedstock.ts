import { database } from '../../infra/database'
import { Feedstock } from '../../models'

export type UpdateFeedstockParams = Feedstock & {
  products?: Array<{ id: number }>
}

export async function updateFeedstock(feedstock: UpdateFeedstockParams): Promise<Feedstock> {
  const { id, ...paramsToUpdate } = feedstock
  const [_, updatedFeedStock] = await database.$transaction([
    database.feedstockEntity.update({
      where: {
        id
      },
      data: {
        products: {
          set: []
        }
      }
    }),
    database.feedstockEntity.update({
      where: { id },
      data: {
        ...paramsToUpdate,
        products: {
          connect: paramsToUpdate.products || []
        }
      }
    })])

  if (!updatedFeedStock) {
    throw new Error('Server error')
  }

  return updatedFeedStock
}
