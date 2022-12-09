import { Router } from 'express'
import { Client } from '@/models/client'
import { addClient, deleteClient, findClient, findclientPage, updateClient } from '@/use-cases/client'

export function makeClientRoutes (router: Router): void {
  router.post('/', (req, res) => {
    const {
      address,
      name,
      contactPhone,
      cnpj,
      cpf
    } = req.body as Client

    const isAddressValid = address && typeof address === 'string'
    const isContactPhoneValid = contactPhone && typeof contactPhone === 'string'
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
      contactPhone
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

  router.get('/', (req, res) => {
    const { itemsPerPage = '10', page = '1' } = req.query

    findclientPage({
      itemsPerPage: parseInt(itemsPerPage as string),
      page: parseInt(page as string)
    }).then((clientPage) => {
      return res.status(200).json(clientPage)
    }).catch((error) => {
      console.error(error)
      res.status(500).json({ error: 'ServerError' })
    })
  })

  router.get('/:id', (req, res) => {
    const clientId = req.params.id

    const isClientValid = !isNaN(parseInt(clientId))

    if (!isClientValid) {
      return res.status(400).json({ error: 'BadRequest' })
    }

    findClient(parseInt(clientId)).then((clientPage) => {
      return res.status(200).json(clientPage)
    }).catch((error) => {
      console.error(error)
      res.status(500).json({ error: 'ServerError' })
    })
  })

  router.put('/:id', (req, res) => {
    const {
      address,
      name,
      contactPhone,
      cnpj,
      cpf
    } = req.body as Client

    const { id } = req.params

    const isAddressValid = address && typeof address === 'string'
    const isContactPhoneValid = contactPhone && typeof contactPhone === 'string'
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

    void updateClient({
      id: parseInt(id),
      address,
      name,
      cnpj,
      cpf,
      contactPhone
    }).then(client => res.status(200).json(client)).catch(error => {
      console.error(error)
      res.status(500).json({ error: 'ServerError' })
    })
  })
}
