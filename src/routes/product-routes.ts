import { addProduct } from '@/use-cases/product/add-product'
import type { AddProductParams } from '@/use-cases/product/add-product'
import { Router } from 'express'

export function makeProductRoutes (router: Router): void {
  router.post('/', (req, res) => {
    const {
      batchCode,
      expirationDate,
      grammage,
      name,
      price,
      productionDate,
      quantity,
      feedstocks
    } = req.body as AddProductParams

    void addProduct({
      batchCode,
      expirationDate,
      grammage,
      name,
      price,
      productionDate,
      quantity,
      feedstocks
    }).then(person => res.status(200).json(person)).catch((error) => {
      console.error(error)
      res.status(500).json({ error: 'ServerError' })
    })
  })
}
