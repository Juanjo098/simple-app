import e from 'express'
import { PORT } from './config'
import { findProducts } from './controllers/products/find'
import { createProduct } from './controllers/products/create'
import { updateProduct } from './controllers/products/update'
import { deleteProduct } from './controllers/products/delete'

const app = e()

app.use(e.json())

app.use('/product', findProducts)
app.use('/product', createProduct)
app.use('/product', updateProduct)
app.use('/product', deleteProduct)

app.use((_req, res) => {
  res.status(404).json({ message: 'Ruta no definida' })
})

app.listen(PORT, () => {
  console.log('Server running on port', PORT)
})
