import { Router } from 'express'
import { mongodbClient } from '../../libs/mongodb'
import { ObjectId } from 'mongodb'

export const updateProduct = Router()

updateProduct.put('/:id', async (req, res) => {
  const productId = req.params.id

  const { name, price, stock } = req.body

  const newProduct = { name, price: Number(price), stock: Number(stock) }

  try {
    const result = await mongodbClient(async (client) => {
      return await client
        .db('pruebas')
        .collection('productos')
        .findOneAndUpdate(
          { _id: new ObjectId(productId) },
          { $set: { ...newProduct } },
          { 
            returnDocument: 'after',
            projection: {
              productId: '$_id',
              name: 1,
              price: 1,
              stock: 1,
            } 
          }
        )
    })
  
    res.status(200).json(result ?? { message: 'Producto no encontrado' })
  } catch (err) {
    res.status(500).json({ message: 'Error inesperado' })
  }
})