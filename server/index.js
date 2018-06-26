const express = require('express')
const app = express()
// const cors = require './cors'
const body = require('body-parser')
const portNum = 4001
const Sequelize = require('sequelize')
const sequelize = new Sequelize('postgres://postgres:secret@localhost:5432/postgres', {
  define: {
    timestamps: false
  }
})

app.use(body.json())

app.listen(portNum, () => console.log(`express API is listening on port ${portNum} `))
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE')
  next()
})

// create application/json parser
// const jsonParser = bodyParser.json()

const Product = sequelize.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false
  },
  image: Sequelize.STRING
}, {
  tableName: 'products',
  timestamps: false
})
app.get('/products', (request, response) => {
  Product.findAll({
    attributes: ["id", "name", "price"]
  }).then(products => {
    response.send({products})
  }).catch(err => {
    console.log(err)
    response.status(500).send(JSON.stringify(err))
  })
})
app.get('/products/:id', (request, response) => {
  const productId = +request.params.id
  Product.findById(productId).then(product => {
    response.send(product)
  }).catch(err => {
    console.log(err)
    response.status(500).send(JSON.stringify(err))
  })
})

app.post('/products', (request, response) => {
  const productBody = request.body

sendResponse(Product.create(productBody), response)

})

app.put('/products/:id', (req, res) => {
  const productId = Number(req.params.id)
  const updates = req.body


Product.findById(productId).then(product => product.update(updates).then(_=> res.send(product)))
.catch(fail(res))
})

app.delete('/products/:id', (req, res) => {
  const productId = Number(req.params.id)
  const updates = req.body

Product.findById(productId).then(product => product.destroy(updates).then(_=> res.send(product)))
.catch(fail(res))
})

const sendResponse = (promise, res) => {
  promise.then(
    result => {
      if (result) {
        res.send(result)
      } else {
        res.status(404).end()
      }
    }).catch(fail(res))

  }

  const fail = () => err => {
    console.error(err)
    res.status(500).send(JSON.stringify(err))
  }
