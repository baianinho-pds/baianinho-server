import { FeedstockEntity } from '@/infra/entities'
import { Feedstock } from '@/models'

export async function findFeedstock (feedstockId: number): Promise<Feedstock> {
  const feedstock = await FeedstockEntity.findOne({
    where: {
      id: feedstockId
    }
  })

  return feedstock.toJSON()
}
