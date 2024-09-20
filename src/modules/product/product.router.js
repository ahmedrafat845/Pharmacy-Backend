import express from 'express'
import { addProduct, deleteProduct, getAllProducts, updateProduct } from './product.controller.js'


export const productRouter=express.Router()

productRouter.post('/addProduct',addProduct)
productRouter.delete('/deleteProduct',deleteProduct)
productRouter.get('/getAllProducts',getAllProducts)
productRouter.put('/updateProduct',updateProduct)