import { Database } from '@/infra/database'
import { FeedStock } from '@/models/feedstock'

type AddFeedStockParams = Omit<FeedStock, 'id'>

export async function addFeedStock(params: AddFeedStockParams): Promise<FeedStock> {
  const feedstock = await Database.getInstance().insert('feedstock', params)

  return feedstock
}
