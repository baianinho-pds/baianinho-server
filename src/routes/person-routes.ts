import { Person } from '@/models/person'
import {
  addPerson,
  deletePerson,
  findPerson,
  findPersonPage,
  updatePerson
} from '@/use-cases/person'
import { Router } from 'express'

export function makePersonRoutes(router: Router): void {
  router.post('/', (req, res) => {
    const validRoles: Person.Role[] = ['admin', 'seller']
    const validSectors: Person.Sector[] = ['external', 'internal']
    const {
      name,
      ctps,
      cpf,
      admissionDate,
      contactPhone,
      role,
      city,
      neighborhood,
      number,
      postalCode,
      sector,
      street
    } = req.body as Person

    const isNameValid = name && typeof name === 'string'
    const isCptsValid = ctps && typeof ctps === 'string'
    const isCpfValid = cpf && typeof cpf === 'string'
    const isAdmissionDateValid = admissionDate && new Date(admissionDate).getTime() > 0
    const isContactPhoneValid = contactPhone && typeof contactPhone === 'string'
    const isRoleValid = role && validRoles.includes(role)
    const isCityValid = city && typeof city === 'string'
    const isNeighborhoodValid = neighborhood && typeof neighborhood === 'string'
    const isNumberValid = number && typeof number === 'string'
    const isPostalCodeValid = postalCode && typeof postalCode === 'string'
    const isSectorValid = sector && validSectors.includes(sector)
    const isStreetValid = street && typeof street === 'string'

    console.log({ isNameValid, isCptsValid, isCpfValid, isAdmissionDateValid, isContactPhoneValid, isRoleValid, isCityValid, isNeighborhoodValid, isNumberValid, isPostalCodeValid, isSectorValid, isStreetValid });


    if (
      !isNameValid ||
      !isCptsValid ||
      !isCpfValid ||
      !isAdmissionDateValid ||
      !isContactPhoneValid ||
      !isRoleValid ||
      !isCityValid ||
      !isNeighborhoodValid ||
      !isNumberValid ||
      !isPostalCodeValid ||
      !isSectorValid ||
      !isStreetValid
    ) {
      return res.status(400).json({ error: 'BadFormat' })
    }

    void addPerson({
      admissionDate,
      contactPhone,
      cpf,
      ctps,
      name,
      role,
      sector,
      city,
      neighborhood,
      number,
      postalCode,
      street
    }).then(person => res.status(200).json(person)).catch((error) => {
      console.error(error)
      res.status(500).json({ error: 'ServerError' })
    })
  })

  router.get('/', (req, res) => {
    const { itemsPerPage = '10', page = '1' } = req.query

    findPersonPage({
      itemsPerPage: parseInt(itemsPerPage as string),
      page: parseInt(page as string)
    }).then((personPage) => {
      return res.status(200).json(personPage)
    }).catch((error) => {
      console.error(error)
      res.status(500).json({ error: 'ServerError' })
    })
  })

  router.get('/:id', (req, res) => {
    const personId = req.params.id

    const isPersonValid = !isNaN(parseInt(personId))

    if (!isPersonValid) {
      return res.status(400).json({ error: 'BadRequest' })
    }

    findPerson(parseInt(personId)).then((personPage) => {
      return res.status(200).json(personPage)
    }).catch((error) => {
      console.error(error)
      res.status(500).json({ error: 'ServerError' })
    })
  })

  router.delete('/:id', (req, res) => {
    const personId = req.params.id

    const isPersonValid = !isNaN(parseInt(personId))

    if (!isPersonValid) {
      return res.status(400).json({ error: 'BadRequest' })
    }

    deletePerson(parseInt(personId)).then(() => {
      return res.status(204).send()
    }).catch((error) => {
      console.error(error)
      res.status(500).json({ error: 'ServerError' })
    })
  })

  router.put('/:id', (req, res) => {
    const validRoles: Person.Role[] = ['admin', 'seller']
    const validSectors: Person.Sector[] = ['external', 'internal']
    const {
      name,
      ctps,
      cpf,
      admissionDate,
      contactPhone,
      role,
      city,
      neighborhood,
      number,
      postalCode,
      sector,
      street,
      demissionDate
    } = req.body as Person

    const { id } = req.params

    const isNameValid = name && typeof name === 'string'
    const isCptsValid = ctps && typeof ctps === 'string'
    const isCpfValid = cpf && typeof cpf === 'string'
    const isAdmissionDateValid = admissionDate && new Date(admissionDate).getTime() > 0
    const isContactPhoneValid = contactPhone && typeof contactPhone === 'string'
    const isRoleValid = role && validRoles.includes(role)
    const isCityValid = city && typeof city === 'string'
    const isNeighborhoodValid = neighborhood && typeof neighborhood === 'string'
    const isNumberValid = number && typeof number === 'string'
    const isPostalCodeValid = postalCode && typeof postalCode === 'string'
    const isSectorValid = sector && validSectors.includes(sector)
    const isStreetValid = street && typeof street === 'string'
    const isDemissionDateValid = !demissionDate || (new Date(demissionDate).getTime() > 0)
    const isPersonValid = !isNaN(parseInt(id))

    if (
      !isNameValid ||
      !isCptsValid ||
      !isCpfValid ||
      !isAdmissionDateValid ||
      !isContactPhoneValid ||
      !isRoleValid ||
      !isCityValid ||
      !isNeighborhoodValid ||
      !isNumberValid ||
      !isPostalCodeValid ||
      !isSectorValid ||
      !isStreetValid ||
      !isDemissionDateValid ||
      !isPersonValid
    ) {
      return res.status(400).json({ error: 'BadFormat' })
    }

    void updatePerson({
      id: parseInt(id),
      admissionDate,
      contactPhone,
      cpf,
      ctps,
      name,
      role,
      sector,
      city,
      neighborhood,
      number,
      postalCode,
      street,
      demissionDate
    }).then(person => res.status(200).json(person)).catch((error) => {
      console.error(error)
      res.status(500).json({ error: 'ServerError' })
    })
  })
}
