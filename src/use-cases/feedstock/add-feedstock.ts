import { database } from '../../infra/database'
import { Feedstock } from '../../models'

type AddFeedstockParams = Omit<Feedstock, 'id'> & {
  products?: Array<{ id: number }>
}

export async function addFeedStock (params: AddFeedstockParams): Promise<Feedstock> {
  const feedstock = await database.feedstockEntity.create({
    data: {
      ...params,
      products: {
        connect: params.products || []
      }
    },
    include: { products: true }
  })
  return feedstock
}
