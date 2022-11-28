import { Database } from '../../infra/database'
import { FeedStock } from '../../models/feedstock'

export async function findFeedStock(feedstockId: number): Promise<FeedStock> {
  const feedstock = await Database.getInstance().findOne<FeedStock>('feedstock', {
    select: '*',
    where: {
      id: feedstockId
    }
  })

  return feedstock
}
