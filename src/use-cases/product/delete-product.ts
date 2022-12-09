import { database } from '../../infra/database'

export async function deleteProduct (productId: number): Promise<void> {
  await database.productEntity.delete({
    where: {
      id: productId
    }
  })
}
