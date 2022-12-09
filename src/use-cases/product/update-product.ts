import { database } from '../../infra/database'
import { Product } from '../../models'

export async function updateProduct (product: Product): Promise<Product> {
  const { id, ...paramsToUpdate } = product
  const updatedFeedStock = await database.productEntity.update({
    where: { id },
    data: {
      ...paramsToUpdate,
      feedstocks: {
        connect: paramsToUpdate.feedstocks || []
      }
    },
    include: {
      feedstocks: true
    }
  })

  if (!updatedFeedStock) {
    throw new Error('Server error')
  }

  return { ...updatedFeedStock, price: updatedFeedStock.price.toNumber() }
}
