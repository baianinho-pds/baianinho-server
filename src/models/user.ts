export interface User {
  id: number
  name: string
  ctps: string
  cpf: string
  admissionDate: Date
  demissionDate?: Date | null
  contactPhone: string
  role: User.Role
  city: string
  neighborhood: string
  street: string
  number: string
  postalCode: string
  sector: User.Sector
}

export namespace User {
  export type Role = 'admin' | 'seller'
  export type Sector = 'internal' | 'external'
}
