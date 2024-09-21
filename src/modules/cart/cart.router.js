import express from "express"
import { addProductToCart, clearCart, getCartForUser, removeProductFromCart, updateProductQuantityInCart } from "./cart.controller.js"

export let cartRouter=express.Router()

cartRouter.get('/getCartForUser', getCartForUser);
cartRouter.post('/addProductToCart',addProductToCart)
cartRouter.put('/updateProductQuantityInCart',updateProductQuantityInCart)
cartRouter.delete('/removeProductFromCart/:productId',removeProductFromCart)
cartRouter.delete('/clearCart',clearCart)

