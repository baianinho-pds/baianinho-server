interface Client {
  id: number
  name: string
  address: string
  contactPhone: string
  cpf?: string | null
  cnpj?: string | null
}

export type { Client }
