const { Router } = require('express')
const { getAllBuy, getBuyById, getBuysByUser, getBuysByPublication } = require('../controllers/buys.js')
const router = Router()
const { Buy, BuyItem, Publication } = require('../db')

router.get('/', async (req, res) => {
  try {
    const allBuys = await getAllBuy()
    console.log('llegue', allBuys)
    res.status(200).json(allBuys)
  } catch (error) {
    res.status(400).json(error.message)
  }
})
router.get('/:id', async (req, res) => {
  const { id } = req.params
  try {
    const BuyById = await getBuyById(id)
    res.status(200).json(BuyById)
  } catch (error) {
    res.status(400).json(error.message)
  }
})
router.get('/user/:id', async (req, res) => {
  const { id } = req.params
  try {
    const BuyById = await getBuysByUser(id)
    res.status(200).json(BuyById)
  } catch (error) {
    res.status(400).json(error)
  }
})

router.get('/user/sales/:id', async (req, res) => {
  const { id } = req.params

  try {
    const buysId = []
    const buyItems = await BuyItem.findAll({
      include: {
        model: Publication,
        where: {
          userId: id
        }
      }
    })

    buyItems.forEach(item => {
      buysId.push(item.dataValues.buyId)
    })

    const resultParsed = []
    buyItems.forEach(async (item) => {
      const b = await Buy.findByPk(item.dataValues.buyId)
      resultParsed.push({
        buyId: b.dataValues.id,
        currency: b.dataValues.currency,
        paymentMethod: b.dataValues.paymentMethod,
        totalAmount: b.dataValues.totalAmount,
        userId: b.dataValues.userId,
        createdAt: b.dataValues.createdAt
      })
    })
    console.log('Results', resultParsed)
    res.status(200).json(resultParsed)
  } catch (error) {
    res.status(400).json(error.message)
  }
})

router.get('/publication/:id', async (req, res) => {
  const { id } = req.params
  try {
    const BuyById = await getBuysByPublication(id)
    res.status(200).json(BuyById)
  } catch (error) {
    res.status(400).json(error.message)
  }
})
module.exports = router
