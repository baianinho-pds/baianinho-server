import { Page } from '../../shared/types'
import { Feedstock } from '../../models'
import { database } from '../../infra/database'

interface FindPageParams {
  page: number
  itemsPerPage: number
}

export async function findFeedstockPage (params: FindPageParams): Promise<Page<Feedstock>> {
  const [total, data] = await database.$transaction([
    database.feedstockEntity.count(),
    database.feedstockEntity.findMany({
      take: params.itemsPerPage,
      skip: params.itemsPerPage * (params.page - 1),
    })
  ])

  return { total, data }
}
