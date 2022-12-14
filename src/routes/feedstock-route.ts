import { Router } from 'express'
import { Feedstock } from '@/models/feedstock'
import { addFeedStock, AddFeedstockParams, deleteFeedstock, findFeedstock, findFeedstockPage, updateFeedstock } from '@/use-cases/feedstock'

export function makeFeedStockRoutes(router: Router): void {
  router.post('/', (req, res) => {
    const {
      amount,
      name,
      provider,
      suppliesType,
      unit,
      validity,
      products
    } = req.body as AddFeedstockParams

    const isAmountValid = amount === undefined || amount === null || typeof amount === 'number'
    const isNameValid = name && typeof name === 'string'
    const isProviderValid = provider && typeof provider === 'string'
    const isSuppliesTypeValid = suppliesType && typeof suppliesType === 'string'
    const isUnitValid = unit && typeof unit === 'string'
    // eslint-disable-next-line no-mixed-operators
    const isValidytValid = validity === undefined || validity === null || validity && new Date(validity).getTime() > 0

    if (!isAmountValid || !isNameValid || !isProviderValid || !isSuppliesTypeValid || !isUnitValid || !isValidytValid) {
      return res.status(400).json({ error: 'BadFormat' })
    }

    addFeedStock({
      amount, name, provider, suppliesType, unit, validity, products
    }).then(feedstock => res.status(200).json(feedstock)).catch(error => {
      console.error(error)
      res.status(500).json({ error: 'ServerError' })
    })
  })

  router.get('/', (req, res) => {
    const { itemsPerPage = '10', page = '1' } = req.query

    findFeedstockPage({
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

    findFeedstock(parseInt(feedstockId)).then(feedstock => res.status(200).json(feedstock))
      .catch(error => {
        console.error(error)
        res.status(500).json({ error: 'ServerError' })
      })
  })

  router.put('/:id', (req, res) => {
    const {
      amount,
      name,
      provider,
      suppliesType,
      unit,
      validity,
      products
    } = req.body as AddFeedstockParams

    const { id } = req.params

    const isAmountValid = amount === undefined || amount === null || typeof amount === 'number'
    const isNameValid = name && typeof name === 'string'
    const isProviderValid = provider && typeof provider === 'string'
    const isSuppliesTypeValid = suppliesType && typeof suppliesType === 'string'
    const isUnitValid = unit && typeof unit === 'string'
    // eslint-disable-next-line no-mixed-operators
    const isValidytValid = validity === undefined || validity === null || validity && new Date(validity).getTime() > 0

    if (!isAmountValid || !isNameValid || !isProviderValid || !isSuppliesTypeValid || !isUnitValid || !isValidytValid) {
      return res.status(400).json({ error: 'BadFormat' })
    }

    updateFeedstock({
      id: parseInt(id),
      amount,
      name,
      provider,
      suppliesType,
      unit,
      validity,
      products
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

    deleteFeedstock(parseInt(feedstockId)).then(() => {
      return res.status(204).send()
    }).catch((error) => {
      console.error(error)
      res.status(500).json({ error: 'ServerError' })
    })
  })
}
