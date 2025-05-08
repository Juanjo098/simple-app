import { Router } from 'express'
import { mongodbClient } from '../../libs/mongodb'

export const findProducts = Router()

findProducts.get('/', async (req, res) => {
  const { name, page, limit } = req.query

  try {
    const results = await mongodbClient(async (client) => {
      return await client
        .db('pruebas')
        .collection('productos')
        .find(
          { name: { $regex: name, $options: 'i' } },
          { 
            projection: {
              productId: '$_id',
              name: 1,
              price: 1,
              stock: 1,
            } 
          }
        )
        .skip((Number(page) - 1) * Number(limit))
        .limit(Number(limit))
        .toArray()
    })
  
    res.status(200).json(results)
  } catch (err) {
    res.status(500).json({ message: 'Error inesperado' })
  }
})