import express from "express"
import { addProductToCart } from "./cart.controller.js"

export let cartRouter=express.Router()

cartRouter.post('/addProductToCart',addProductToCart)