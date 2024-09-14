import express from 'express'
import { addProduct, deleteProduct } from './product.controller.js'


export const productRouter=express.Router()

productRouter.post('/addProduct',addProduct)
productRouter.delete('/deleteProduct',deleteProduct)