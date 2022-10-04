export type User = {
  id: number
  name: string
  cpts: string
  cpf: string
  admissionDate: Date
  demissionDate?: Date
  contactPhone: string
  role: User.Role
}

export namespace User {
  export type Role =  'admin' | 'seller'
}