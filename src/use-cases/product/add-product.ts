import { FeedstockEntity, ProductEntity } from '@/infra/entities'
import { Feedstock } from '@/models'
import { Product } from '@/models/product'

export type AddProductParams = Omit<Product, 'id'> & {
  feedstocks?: Array<{ id: string }>
}

type AddProductResponse = Product & {
  feedstocks: Feedstock[]
}

export async function addProduct ({ feedstocks, ...params }: AddProductParams): Promise<AddProductResponse> {
  const savedFeedstocks = await FeedstockEntity.findAll({
    where: {
      id: feedstocks.map(({ id }) => id) ?? []
    }
  })

  await FeedstockEntity.destroy({
    where: {}
  })
  const createdProduct = await ProductEntity.create({ ...params, feedstocks: savedFeedstocks.map((item) => item.toJSON()).map(({ id, ...rest }) => rest) }, { include: [{ model: FeedstockEntity, as: 'feedstocks' }] })

  return await createdProduct.toJSON()
}
