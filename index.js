import express from 'express'
import { DbConnection } from './DataBase/dbConnection.js'
import cors from 'cors'
import userRouter from './src/modules/user/user.router.js'
import { productRouter } from './src/modules/product/product.router.js'
import { cartRouter } from './src/modules/cart/cart.router.js'


const app = express()
DbConnection()
const port = 3000

app.use(cors())
app.use(express.json())
app.use('/users',userRouter)
app.use('/products',productRouter)
app.use('/carts',cartRouter)

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))