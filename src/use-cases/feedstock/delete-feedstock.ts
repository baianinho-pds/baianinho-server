import { Database } from '@/infra/database'
import { FeedStock } from '@/models/feedstock'

export async function deleteFeedStock(feedstockId: number): Promise<void> {
  await Database.getInstance().delete<FeedStock>('feedstock', {
    where: { id: feedstockId }
  })
}
