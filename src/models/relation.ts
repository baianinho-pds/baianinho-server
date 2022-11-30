interface JoinColumn {
  columnName: string
  referenceColumnName: string
}

export interface Relation {
  type: 'many-to-many'
  aux_table_name: string
  joinColumn: JoinColumn
  inverseJoinColumn: JoinColumn
}
