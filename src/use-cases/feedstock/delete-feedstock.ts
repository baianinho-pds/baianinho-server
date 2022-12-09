import { database } from '../../infra/database'

export async function deleteFeedstock (feedstockId: number): Promise<void> {
  await database.feedstockEntity.delete({
    where: {
      id: feedstockId
    }
  })
}
