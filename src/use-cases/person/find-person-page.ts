import { PersonEntity } from '@/infra/entities'
import { Page } from '@/shared/types'
import { Person } from '../../models/person'

interface FindPageParams {
  page: number
  itemsPerPage: number
}

type FindPageResponse = Pick<Person, 'id' | 'name' | 'contactPhone'>

export async function findPersonPage (
  params: FindPageParams
): Promise<Page<FindPageResponse>> {
  const personPage = await PersonEntity.findAndCountAll({
    limit: params.itemsPerPage,
    offset: params.page - 1,
    attributes: ['id', 'name', 'contactPhone']
  })

  return {
    total: personPage.count,
    data: personPage.rows.map(row => row.toJSON())
  }
}
