import { Database, Page } from "../../infra/database"
import { Person } from "../../models/person"

type FindPageParams = {
  page: number
  itemsPerPage: number
}

export async function findPersonPage(
  params: FindPageParams
): Promise<Page<Person>> {
  const personPage = await Database.getInstance().findMany<Person>("person", {
    limit: params.itemsPerPage,
    offset: params.page - 1,
    select: ["id", "name", "contact_phone"],
    count: true
  })

  return personPage
}
