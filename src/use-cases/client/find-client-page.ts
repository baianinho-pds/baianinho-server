import { Page } from '@/shared/types'
import { ClientEntity } from '@/infra/entities'
import { Client } from '@/models/client'

interface FindPageParams {
  page: number
  itemsPerPage: number
}

export async function findclientPage (params: FindPageParams): Promise<Page<Client>> {
  const clientPage = await ClientEntity.findAndCountAll({
    limit: params.itemsPerPage,
    offset: params.page - 1
  })

  return {
    total: clientPage.count,
    data: clientPage.rows.map(row => row.toJSON())
  }
}
