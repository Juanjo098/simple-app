import { Router } from 'express'
import { mongodbClient } from '../../libs/mongodb'
import { ObjectId } from 'mongodb'

export const deleteProduct = Router()

deleteProduct.delete('/:id', async (req, res) => {
  const productId = req.params.id

  try {
    const result = await mongodbClient(async (client) => {
      return await client
        .db('pruebas')
        .collection('productos')
        .findOneAndDelete(
          { _id: new ObjectId(productId) },
          {
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