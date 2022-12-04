import { FeedstockEntity } from '@/infra/entities'
import { Feedstock } from '@/models'

export async function updateFeedstock (feedstock: Feedstock): Promise<Feedstock> {
  const { id, ...paramsToUpdate } = feedstock
  const [affected, updatedFeedStock] = await FeedstockEntity.update(paramsToUpdate, {
    where: { id },
    returning: true
  })

  if (!affected) {
    throw new Error('Server error')
  }

  return updatedFeedStock[0].toJSON()
}
