import { Feedstock } from './feedstock'

interface Product {
  id: number
  name: string
  batchCode: number
  grammage: number
  quantity: number
  price: number
  feedstocks: Feedstock[]
  productionDate: Date
  expirationDate: Date
}

export type { Product }
