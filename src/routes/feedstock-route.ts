import { Router } from 'express'
import { FeedStock } from '@/models/feedstock'
import { addFeedStock, deleteFeedStock, findFeedStock, findFeedStockPage, updateClient } from '@/use-cases/feedstock'

export function makeFeedStockRoutes (router: Router): void {
  router.post('/', (req, res) => {
    const {
      amount,
      name,
      provider,
      supplies_type,
      unit,
      validity
    } = req.body as FeedStock

    const isAmountValid = amount === undefined || amount === null || typeof amount === 'number'
    const isNameValid = name && typeof name === 'string'
    const isProviderValid = provider && typeof provider === 'string'
    const isSuppliesTypeValid = supplies_type && typeof supplies_type === 'string'
    const isUnitValid = unit && typeof unit === 'string'
    const isValidytValid = validity === undefined || validity === null || new Date(validity).getTime() > 0

    if (!isAmountValid || !isNameValid || !isProviderValid || !isSuppliesTypeValid || !isUnitValid || !isValidytValid) {
      return res.status(400).json({ error: 'BadFormat' })
    }

    addFeedStock({
      amount, name, provider, supplies_type, unit, validity
    }).then(feedstock => res.status(200).json(feedstock)).catch(error => {
      console.error(error)
      res.status(500).json({ error: 'ServerError' })
    })
  })

  router.get('/', (req, res) => {
    const { itemsPerPage = '10', page = '1' } = req.query

    findFeedStockPage({
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

    findFeedStock(parseInt(feedstockId)).then(feedstock => res.status(200).json(feedstock))
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
      supplies_type,
      unit,
      validity
    } = req.body as FeedStock

    const { id } = req.params

    const isAmountValid = amount === undefined || amount === null || typeof amount === 'number'
    const isNameValid = name && typeof name === 'string'
    const isProviderValid = provider && typeof provider === 'string'
    const isSuppliesTypeValid = supplies_type && typeof supplies_type === 'string'
    const isUnitValid = unit && typeof unit === 'string'
    const isValidytValid = validity === undefined || validity === null || new Date(validity).getTime() > 0

    if (!isAmountValid || !isNameValid || !isProviderValid || !isSuppliesTypeValid || !isUnitValid || !isValidytValid) {
      return res.status(400).json({ error: 'BadFormat' })
    }

    updateClient({
      id: parseInt(id),
      amount,
      name,
      provider,
      supplies_type,
      unit,
      validity
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

    deleteFeedStock(parseInt(feedstockId)).then(() => {
      return res.status(204).send()
    }).catch((error) => {
      console.error(error)
      res.status(500).json({ error: 'ServerError' })
    })
  })
}
