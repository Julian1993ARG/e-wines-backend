/* const server = require('express').Router()
/* const { createBuy } = require('../controllers/webhooksMP') */
/*
server.post('/', (req, res, next) => {
  console.log(req.body)
  res.status(200).send('OK')
 const { body, query } = req
  const id = body.data.id
  const payment = query.type
  console.log(body)
  console.log(query)
  if (id && payment === 'payment') {
    try {
      const newBuy = createBuy(id)
      if (newBuy) {
        res.status(200).send('OK')
      }
    } catch (error) {
      throw console.error(error)
    }
  } else next()
})
module.exports = server
 */

const PagarProducto = async (req, res) => {
  console.log(req.body)
  res.status(200).send('OK')
}

module.exports = { PagarProducto }