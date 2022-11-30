import { Relation } from '@/models/relation'

export interface Product {
  id: number
  name: string
  batch_code: number
  grammage: number
  quantity: number
  price: number
  production_date: Date
  expiration_date: Date
}

export namespace Product {
  export const Relations: Relation[] = [{
    type: 'many-to-many',
    aux_table_name: 'product_feedstock',
    joinColumn: {
      columnName: 'product_id',
      referenceColumnName: 'id'
    },
    inverseJoinColumn: {
      columnName: 'feedstock_id',
      referenceColumnName: 'id'
    }
  }]
}
