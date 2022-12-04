import { FeedstockEntity } from '@/infra/entities'
import { Feedstock } from '@/models'

type AddFeedstockParams = Omit<Feedstock, 'id'>

export async function addFeedStock (params: AddFeedstockParams): Promise<Feedstock> {
  const feedstock = await FeedstockEntity.create(params)
  return await feedstock.toJSON()
}
