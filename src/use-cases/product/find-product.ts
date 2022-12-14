import { database } from '../../infra/database'
import { Product } from '../../models'

export async function findProduct(productId: number): Promise<Product> {
  const product = await database.productEntity.findFirst({
    where: {
      id: productId
    },
    include: {
      feedstocks: true
    }
  })

  if (!product) {
    throw new Error('Not Found')
  }

  return { ...product, price: product.price.toNumber() }
}
