import { Database } from '../../infra/database'
import { User } from '../../models/user'

type AddUserParams = Omit<User, 'id'> & {
  subsidiary: { id: string }
  address: { id: string }
}

export class AddUser {
  async add (params: AddUserParams): Promise<User> {
    const user = await Database.getInstance().insert('user', {
      name: params.name,
      ctps: params.ctps,
      cpf: params.cpf,
      admission_date: params.admissionDate,
      demission_date: params.demissionDate ?? null,
      contact_phone: params.contactPhone,
      role_name: params.role,
      subsidiary_id: params.subsidiary.id,
      address_id: params.address.id
    })

    if (!user) {
      throw new Error('Server error')
    }

    return {
      admissionDate: user.admission_date,
      contactPhone: user.contact_phone,
      cpf: user.cpf,
      ctps: user.ctps,
      id: user.id,
      name: user.name,
      role: user.role_name,
      demissionDate: user.demission_date
    }
  }
}
