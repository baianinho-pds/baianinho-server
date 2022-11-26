import { Database, Page } from '@/infra/database'
import { FeedStock } from '@/models/feedstock'

interface FindPageParams {
  page: number
  itemsPerPage: number
}

export async function findFeedStockPage(params: FindPageParams): Promise<Page<FeedStock>> {
  const feedstockPage = await Database.getInstance().findMany<FeedStock>('feedstock', {
    limit: params.itemsPerPage,
    offset: params.page - 1,
    select: '*',
    count: true
  })

  return feedstockPage
}
