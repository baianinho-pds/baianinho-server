interface Person {
  id: number
  name: string
  ctps: string
  cpf: string
  admissionDate: Date
  demissionDate?: Date | null
  contactPhone: string
  role: Person.Role
  city: string
  neighborhood: string
  street: string
  number: string
  postalCode: string
  sector: Person.Sector
}

namespace Person {
  export type Role = 'admin' | 'seller'
  export type Sector = 'internal' | 'external'
}

export type { Person }
