import { Router } from 'express'
import { FeedStock } from '@/models/feedstock'
import { addFeedStock } from '@/use-cases/feedstock'

export function makeFeedStockRoutes(router: Router): void {
  router.post('/', (req, res) => {
    const {
      amount,
      name,
      provider,
      suppliesType,
      unit,
      validity
    } = req.body as FeedStock

    const isAmountValid = amount === undefined || amount === null || typeof amount === 'number'
    const isNameValid = name && typeof name === 'string'
    const isProviderValid = provider && typeof provider === 'string'
    const isSuppliesTypeValid = suppliesType && typeof suppliesType === 'string'
    const isUnitValid = unit && typeof unit === 'string'
    const isValidytValid = validity === undefined || validity === null || validity && new Date(validity).getTime() > 0

    if (!isAmountValid || !isNameValid || !isProviderValid || !isSuppliesTypeValid || !isUnitValid || !isValidytValid) {
      return res.status(400).json({ error: 'BadFormat' })
    }

    void addFeedStock({
      amount, name, provider, suppliesType, unit, validity
    }).then(feedstock => res.status(200).json(feedstock)).catch(error => {
      console.error(error)
      res.status(500).json({ error: 'ServerError' })
    })
  })
}