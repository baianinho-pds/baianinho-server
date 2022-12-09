interface Feedstock {
  id: number
  name: string
  suppliesType: string
  provider: string
  unit: string
  amount?: number | null
  validity?: Date | null
}

export type { Feedstock }
