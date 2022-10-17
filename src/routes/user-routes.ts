import { User } from '@/models/user'
import { addUser } from '@/use-cases/user/add-user'
import { deleteUser } from '@/use-cases/user/delete-user'
import { findUser } from '@/use-cases/user/find-user'
import { findUserPage } from '@/use-cases/user/find-user-page'
import { updateUser } from '@/use-cases/user/update-user'
import { Router } from 'express'

export function makeUserRoutes (router: Router): void {
  router.post('/', (req, res) => {
    const validRoles: User.Role[] = ['admin', 'seller']
    const validSectors: User.Sector[] = ['external', 'internal']
    const {
      name,
      ctps,
      cpf,
      admission_date,
      contact_phone,
      role_name,
      city,
      neighborhood,
      number,
      postal_code,
      sector_name,
      street
    } = req.body as User

    const isNameValid = name && typeof name === 'string'
    const isCptsValid = ctps && typeof ctps === 'string'
    const isCpfValid = cpf && typeof cpf === 'string'
    const isAdmissionDateValid = admission_date && new Date(admission_date).getTime() > 0
    const isContactPhoneValid = contact_phone && typeof contact_phone === 'string'
    const isRoleValid = role_name && validRoles.includes(role_name)
    const isCityValid = city && typeof city === 'string'
    const isNeighborhoodValid = neighborhood && typeof neighborhood === 'string'
    const isNumberValid = number && typeof number === 'string'
    const isPostalCodeValid = postal_code && typeof postal_code === 'string'
    const isSectorValid = sector_name && validSectors.includes(sector_name)
    const isStreetValid = street && typeof street === 'string'

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

    void addUser({
      admission_date,
      contact_phone,
      cpf,
      ctps,
      name,
      role_name,
      sector_name,
      city,
      neighborhood,
      number,
      postal_code,
      street
    }).then(user => res.status(200).json(user)).catch((error) => {
      console.error(error)
      res.status(500).json({ error: 'ServerError' })
    })
  })

  router.get('/', (req, res) => {
    const { itemsPerPage = '10', page = '1' } = req.query

    findUserPage({ 
      itemsPerPage: parseInt(itemsPerPage as string), 
      page: parseInt(page as string)
    }).then((userPage) => {
      return res.status(200).json(userPage)
    }).catch((error) => {
      console.error(error)
      res.status(500).json({ error: 'ServerError' })
    })
  })

  router.get('/:id', (req, res) => {
    const userId = req.params.id

    const isUserIdValid = !isNaN(parseInt(userId)) 

    if(!isUserIdValid) {
      return res.status(400).json({ error: 'BadRequest' })
    }

    findUser(parseInt(userId)).then((userPage) => {
      return res.status(200).json(userPage)
    }).catch((error) => {
      console.error(error)
      res.status(500).json({ error: 'ServerError' })
    })
  })

  router.delete('/:id', (req, res) => {
    const userId = req.params.id

    const isUserIdValid = !isNaN(parseInt(userId)) 

    if(!isUserIdValid) {
      return res.status(400).json({ error: 'BadRequest' })
    }

    deleteUser(parseInt(userId)).then(() => {
      return res.status(204).send()
    }).catch((error) => {
      console.error(error)
      res.status(500).json({ error: 'ServerError' })
    })
  })

  router.put('/:id', (req, res) => {
    const validRoles: User.Role[] = ['admin', 'seller']
    const validSectors: User.Sector[] = ['external', 'internal']
    const {
      name,
      ctps,
      cpf,
      admission_date,
      contact_phone,
      role_name,
      city,
      neighborhood,
      number,
      postal_code,
      sector_name,
      street,
      demission_date
    } = req.body as User

    const { id } = req.params


    const isNameValid = name && typeof name === 'string'
    const isCptsValid = ctps && typeof ctps === 'string'
    const isCpfValid = cpf && typeof cpf === 'string'
    const isAdmissionDateValid = admission_date && new Date(admission_date).getTime() > 0
    const isContactPhoneValid = contact_phone && typeof contact_phone === 'string'
    const isRoleValid = role_name && validRoles.includes(role_name)
    const isCityValid = city && typeof city === 'string'
    const isNeighborhoodValid = neighborhood && typeof neighborhood === 'string'
    const isNumberValid = number && typeof number === 'string'
    const isPostalCodeValid = postal_code && typeof postal_code === 'string'
    const isSectorValid = sector_name && validSectors.includes(sector_name)
    const isStreetValid = street && typeof street === 'string'
    const isDemissionDateValid = !demission_date || (new Date(demission_date).getTime() > 0)
    const isUserIdValid = !isNaN(parseInt(id)) 

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
      !isUserIdValid
    ) {
      return res.status(400).json({ error: 'BadFormat' })
    }

    void updateUser({
        id: parseInt(id),
        admission_date,
        contact_phone,
        cpf,
        ctps,
        name,
        role_name,
        sector_name,
        city,
        neighborhood,
        number,
        postal_code,
        street
    }).then(user => res.status(200).json(user)).catch((error) => {
      console.error(error)
      res.status(500).json({ error: 'ServerError' })
    })
  })
}
