import { database } from '../../infra/database'
import { Feedstock } from '../../models'
import { Product } from '../../models/product'

export type AddProductParams = Omit<Product, 'id'> & {
  feedstocks?: Array<{ id: number }>
}

type AddProductResponse = Product & {
  feedstocks: Feedstock[]
}

export async function addProduct(params: AddProductParams): Promise<AddProductResponse> {
  const savedProducts = await database.productEntity.create({
    data: {
      ...params,
      feedstocks: { connect: params.feedstocks || [] }
    },
    include: {
      feedstocks: true
    }
  })

  return {
    ...savedProducts,
    price: savedProducts.price.toNumber()
  }
}
