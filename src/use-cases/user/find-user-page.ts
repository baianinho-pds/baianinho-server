import { Database, Page } from "../../infra/database"
import { User } from "../../models/user"

type FindPageParams = {
  page: number
  itemsPerPage: number
}

export async function findUserPage(
  params: FindPageParams
): Promise<Page<User>> {
  const userPage = await Database.getInstance().findMany<User>("person", {
    limit: params.itemsPerPage,
    offset: params.page - 1,
    select: ["id", "name", "role_name", "sector_name"],
  })

  return userPage
}
