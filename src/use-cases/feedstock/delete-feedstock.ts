import { FeedstockEntity } from '@/infra/entities'

export async function deleteFeedstock (feedstockId: number): Promise<void> {
  await FeedstockEntity.destroy({
    where: {
      id: feedstockId
    }
  })
}
