import { database } from '../../infra/database'
import { Page } from '../../shared/types'
import { Person } from '../../models/person'

interface FindPageParams {
  page: number
  itemsPerPage: number
}

type FindPageResponse = Page<Pick<Person, 'id' | 'name' | 'contactPhone'>>

export async function findPersonPage (params: FindPageParams): Promise<FindPageResponse> {
  const [total, data] = await database.$transaction([
    database.personEntity.count(),
    database.personEntity.findMany({
      take: params.itemsPerPage,
      skip: params.itemsPerPage * (params.page - 1)
    })
  ])

  return { total, data }
}
