import { database } from '../../infra/database'
import { Feedstock } from '../../models'

export async function findFeedstock (feedstockId: number): Promise<Feedstock> {
  const feedstock = await database.feedstockEntity.findFirst({
    where: {
      id: feedstockId
    }
  })

  if (!feedstock) {
    throw new Error('Not Found')
  }

  return feedstock
}
