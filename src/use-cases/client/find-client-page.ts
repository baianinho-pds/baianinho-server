import { Page } from '../../shared/types'
import { Client } from '../../models/client'
import { database } from '../../infra/database'

interface FindPageParams {
  page: number
  itemsPerPage: number
}

export async function findclientPage (params: FindPageParams): Promise<Page<Client>> {
  const [total, data] = await database.$transaction([
    database.clientEntity.count(),
    database.clientEntity.findMany({
      skip: params.itemsPerPage * (params.page - 1),
      take: params.itemsPerPage
    })
  ])

  return {
    total,
    data
  }
}
