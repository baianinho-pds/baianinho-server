import { Database, Page } from '@/infra/database'
import { Client } from '@/models/client'

interface FindPageParams {
  page: number
  itemsPerPage: number
}

export async function findclientPage (params: FindPageParams): Promise<Page<Client>> {
  const clientPage = await Database.getInstance().findMany<Client>('client', {
    limit: params.itemsPerPage,
    offset: params.page - 1,
    select: '*',
    count: true
  })

  return clientPage
}
