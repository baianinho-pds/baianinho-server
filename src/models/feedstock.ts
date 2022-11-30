import { Relation } from '@/models/relation'

export interface FeedStock {
  id: number
  name: string
  suppliesType: string
  provider: string
  unit: string
  amount?: number
  validity?: Date
}

export namespace FeedStock {
  export const Relations: Relation[] = [{
    type: 'many-to-many',
    aux_table_name: 'product_feedstock',
    joinColumn: {
      columnName: 'feedstock_id',
      referenceColumnName: 'id'
    },
    inverseJoinColumn: {
      columnName: 'product_id',
      referenceColumnName: 'id'
    }
  }]
}
