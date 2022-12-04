import { FeedstockEntity } from '@/infra/entities'
import { Page } from '@/shared/types'
import { Feedstock } from '@/models'

interface FindPageParams {
  page: number
  itemsPerPage: number
}

export async function findFeedstockPage (params: FindPageParams): Promise<Page<Feedstock>> {
  const feedstockPage = await FeedstockEntity.findAndCountAll({
    limit: params.itemsPerPage,
    offset: params.page - 1
  })

  return {
    total: feedstockPage.count,
    data: feedstockPage.rows.map(row => row.toJSON())
  }
}
