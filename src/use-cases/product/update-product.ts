import { database } from '../../infra/database'
import { Product } from '../../models'

export type UpdateProductsParams = Product & {
  feedstocks?: Array<{ id: number }>
}
export async function updateProduct(product: UpdateProductsParams): Promise<Product> {
  const { id, ...paramsToUpdate } = product
  const [_, updatedFeedStock] = await database.$transaction([
    database.productEntity.update({
      where: {
        id
      },
      data: {
        feedstocks: {
          set: []
        }
      }
    }),
    database.productEntity.update({
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

  ])

  if (!updatedFeedStock) {
    throw new Error('Server error')
  }

  return { ...updatedFeedStock, price: updatedFeedStock.price.toNumber() }
}
