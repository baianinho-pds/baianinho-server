import { Page } from '../../shared/types'
import { Product } from '../../models'
import { database } from '../../infra/database'

interface FindPageParams {
  page: number
  itemsPerPage: number
}

export async function findProductPage(params: FindPageParams): Promise<Page<Product>> {
  const [total, data] = await database.$transaction([
    database.productEntity.count(),
    database.productEntity.findMany({
      take: params.itemsPerPage,
      skip: params.itemsPerPage * (params.page - 1)
    })
  ])

  return { total, data: data.map(item => ({ ...item, price: item.price.toNumber() })) }
}
