import { Router } from 'express'
import { mongodbClient } from '../../libs/mongodb'

export const createProduct = Router()

createProduct.post('/', async (req, res) => {
  const { name, price, stock } = req.body

  const newProduct = { name, price: Number(price), stock: Number(stock) }

  try {
    const result = await mongodbClient(async (client) => {
      const data = { ...newProduct }

      const r = await client
        .db('pruebas')
        .collection('productos')
        .insertOne(newProduct)

      return { productId: r.insertedId, ...data }
    })
  
    res.status(200).json(result)
  } catch (err) {
    res.status(500).json({ message: 'Error inesperado' })
  }
})