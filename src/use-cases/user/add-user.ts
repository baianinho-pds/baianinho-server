import { Database } from '../../infra/database'
import { User } from '../../models/user'

type AddUserParams = Omit<User, 'id' | 'demissionDate'>

export async function addUser (params: AddUserParams): Promise<User> {
  const user = await Database.getInstance().insert('person', {
    name: params.name,
    ctps: params.ctps,
    cpf: params.cpf,
    admission_date: params.admissionDate,
    contact_phone: params.contactPhone,
    role_name: params.role,
    sector_name: params.sector,
    city: params.city,
    neighborhood: params.neighborhood,
    number: params.number,
    postal_code: params.postalCode,
    street: params.street
  })

  if (!user) {
    throw new Error('Server error')
  }

  return {
    id: user.id,
    admissionDate: user.admission_date,
    contactPhone: user.contact_phone,
    cpf: user.cpf,
    ctps: user.ctps,
    name: user.name,
    role: user.role_name,
    city: user.city,
    neighborhood: user.neighborhood,
    number: user.number,
    postalCode: user.postal_code,
    sector: user.sector_name,
    street: user.street
  }
}
