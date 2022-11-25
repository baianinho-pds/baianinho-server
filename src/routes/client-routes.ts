import { Client } from '@/models/client'
import { addClient } from '@/use-cases/client/add-client'
import { deleteClient } from '@/use-cases/client/delete-client'
import { Router } from 'express'

export function makeClientRoutes (router: Router): void {
  router.post('/', (req, res) => {
    const {
      address,
      name,
      contact_phone,
      cnpj,
      cpf
    } = req.body as Client

    const isAddressValid = address && typeof address === 'string'
    const isContactPhoneValid = contact_phone && typeof contact_phone === 'string'
    const isNameValid = name && typeof name === 'string'
    const isCNPJValid = cnpj === undefined || cnpj === null || typeof cnpj === 'string'
    const isCPFValid = cpf === undefined || cpf === null || typeof cpf === 'string'

    if (
      !isAddressValid ||
      !isNameValid ||
      !isCNPJValid ||
      !isCPFValid ||
      !isContactPhoneValid
    ) {
      return res.status(400).json({ error: 'BadFormat' })
    }

    void addClient({
      address,
      name,
      cnpj,
      cpf,
      contact_phone
    }).then(client => res.status(200).json(client)).catch(error => {
      console.error(error)
      res.status(500).json({ error: 'ServerError' })
    })
  })

  router.delete('/:id', (req, res) => {
    const clientId = req.params.id

    const isClientValid = !isNaN(parseInt(clientId))

    if (!isClientValid) {
      return res.status(400).json({ error: 'BadRequest' })
    }

    deleteClient(parseInt(clientId)).then(() => {
      return res.status(204).send()
    }).catch((error) => {
      console.error(error)
      res.status(500).json({ error: 'ServerError' })
    })
  })
}
