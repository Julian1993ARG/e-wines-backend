const { Router } = require('express')
const router = Router()

const { Delivery } = require('../db')

router.post('/', async (req, res) => {
  const { status, buyId } = req.body

  try {
    const delivery = await Delivery.create({
      status,
      buyId
    })

    res.status(201).json(delivery)
  } catch (error) {
    res.status(400).json(error.message)
  }
})

router.put('/:id', async (req, res) => {
  const { id } = req.params
  const { status } = req.body

  try {
    const deliveryUpdated = await Delivery.update(
      {
        status
      },
      {
        where: {
          id
        }
      }
    )

    if (deliveryUpdated) {
      const delivery = await Delivery.findByPk(id)
      res.status(200).json(delivery)
    }
  } catch (error) {
    res.status(400).json(error.message)
  }
})

module.exports = router
