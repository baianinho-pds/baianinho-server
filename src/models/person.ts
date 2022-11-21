export interface Person {
  id: number
  name: string
  ctps: string
  cpf: string
  admission_date: Date
  demission_date?: Date | null
  contact_phone: string
  role_name: Person.Role
  city: string
  neighborhood: string
  street: string
  number: string
  postal_code: string
  sector_name: Person.Sector
}

export namespace Person {
  export type Role = 'admin' | 'seller'
  export type Sector = 'internal' | 'external'
}
