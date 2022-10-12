import { User } from '@/models/user'
import { addUser } from '@/use-cases/user/add-user'
import { Router } from 'express'

export function makeUserRoutes (router: Router): void {
  router.post('/', (req, res) => {
    const validRoles: User.Role[] = ['admin', 'seller']
    const validSectors: User.Sector[] = ['external', 'internal']
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
    } = req.body

    const isNameValid = name && typeof name === 'string'
    const isCptsValid = ctps && typeof ctps === 'string'
    const isCpfValid = cpf && typeof cpf === 'string'
    const isAdmissionDateValid = admissionDate && typeof !isNaN(Date.parse(admissionDate))
    const isContactPhoneValid = contactPhone && typeof contactPhone === 'string'
    const isRoleValid = role && validRoles.includes(role)
    const isCityValid = city && typeof city === 'string'
    const isNeighborhoodValid = neighborhood && typeof neighborhood === 'string'
    const isNumberValid = number && typeof number === 'number'
    const isPostalCodeValid = postalCode && typeof postalCode === 'string'
    const isSectorValid = sector && validSectors.includes(sector)
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
    }).catch(() => {
      res.status(500).json({ error: 'ServerError' })
    })
  })
}
