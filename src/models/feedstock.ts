import { Product } from './product'

interface Feedstock {
  id: number
  name: string
  suppliesType: string
  provider: string
  unit: string
  products?: Product[]
  amount?: number
  validity?: Date
}

export type { Feedstock }
