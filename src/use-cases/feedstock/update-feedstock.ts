import { Database } from '../../infra/database'
import { FeedStock } from '../../models/feedstock'

export async function updateClient(feedstock: FeedStock): Promise<FeedStock> {
  const { id, ...paramsToUpdate } = feedstock
  const updatedFeedStock = await Database.getInstance().update({
    data: paramsToUpdate,
    id,
    table: 'feedstock'
  })

  if (!updatedFeedStock) {
    throw new Error('Server error')
  }

  return updatedFeedStock
}
