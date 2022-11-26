export interface FeedStock {
  id: number
  name: string
  suppliesType: string
  provider: string
  unit: string
  amount?: number
  validity?: Date
}
