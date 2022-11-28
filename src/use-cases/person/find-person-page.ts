import { Database, Page } from '../../infra/database'
import { Person } from '../../models/person'

interface FindPageParams {
  page: number
  itemsPerPage: number
}

type FindPageResponse = Pick<Person, 'id' | 'name' | 'contact_phone'>

export async function findPersonPage (
  params: FindPageParams
): Promise<Page<FindPageResponse>> {
  const personPage = await Database.getInstance().findMany<FindPageResponse>('person', {
    limit: params.itemsPerPage,
    offset: params.page - 1,
    select: ['id', 'name', 'contact_phone'],
    count: true
  })

  return {
    total: personPage.total,
    data: personPage.data
  }
}
