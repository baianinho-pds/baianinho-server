export interface User {
  id: number
  name: string
  ctps: string
  cpf: string
  admissionDate: Date
  demissionDate?: Date | null
  contactPhone: string
  role: User.Role
}

export namespace User {
  export type Role = 'admin' | 'seller'
}
