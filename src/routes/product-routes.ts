import { addProduct } from '@/use-cases/product/add-product'
import type { AddProductParams } from '@/use-cases/product/add-product'
import { Router } from 'express'
import { deleteProduct, findProduct, findProductPage, updateProduct } from '@/use-cases/product'
import { Product } from '@/models'

export function makeProductRoutes(router: Router): void {
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

  router.get('/', (req, res) => {
    const { itemsPerPage = '10', page = '1' } = req.query

    findProductPage({
      itemsPerPage: parseInt(itemsPerPage as string),
      page: parseInt(page as string)
    }).then(feedstockPage => res.status(200).json(feedstockPage)).catch(error => {
      console.error(error)
      res.status(500).json({ error: 'ServerError' })
    })
  })

  router.get('/:id', (req, res) => {
    const feedstockId = req.params.id

    const isFeedStockValid = !isNaN(parseInt(feedstockId))

    if (!isFeedStockValid) {
      return res.status(400).json({ error: 'BadFormat' })
    }

    findProduct(parseInt(feedstockId)).then(feedstock => res.status(200).json(feedstock))
      .catch(error => {
        console.error(error)
        res.status(500).json({ error: 'ServerError' })
      })
  })

  router.put('/:id', (req, res) => {
    const {
      batchCode,
      expirationDate,
      feedstocks,
      grammage,
      name,
      price,
      productionDate,
      quantity
    } = req.body as Product

    const { id } = req.params

    updateProduct({
      id: parseInt(id),
      batchCode,
      expirationDate,
      feedstocks,
      grammage,
      name,
      price,
      productionDate,
      quantity
    }).then(feedstock => res.status(200).json(feedstock)).catch(error => {
      console.error(error)
      res.status(500).json({ error: 'ServerError' })
    })
  })

  router.delete('/:id', (req, res) => {
    const feedstockId = req.params.id

    const isFeedStockValid = !isNaN(parseInt(feedstockId))

    if (!isFeedStockValid) {
      return res.status(400).json({ error: 'BadRequest' })
    }

    deleteProduct(parseInt(feedstockId)).then(() => {
      return res.status(204).send()
    }).catch((error) => {
      console.error(error)
      res.status(500).json({ error: 'ServerError' })
    })
  })
}
