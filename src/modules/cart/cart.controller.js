import { cartModel } from "../../../DataBase/models/cart.model.js";
import { productModel } from "../../../DataBase/models/product.model.js";
import { catchError } from "../../utiles/catchError.js";
import jwt from 'jsonwebtoken';

// Middleware or utility function to extract `userId` from the `token` header
const extractUserIdFromToken = (req) => {
    const token = req.headers.token; // Extract token from `token` header
    if (!token) throw new Error('Token missing');
    
    const decoded = jwt.verify(token, 'ahmedrafat123'); // Replace with your actual secret
    return decoded.userId; // Assuming the token contains `userId`
};

export const addProductToCart = catchError(async (req, res) => {
    const userId = extractUserIdFromToken(req); // Extract `userId` from the token
    const { productId } = req.body; // Only `productId` is being sent in the body

    if (!productId) {
        return res.status(400).json({ msg: "Product ID is required" });
    }

    // Find the product to get its price
    const product = await productModel.findById(productId);
    if (!product) {
        return res.status(404).json({ msg: "Product not found" });
    }

    // Find or create a cart for the user
    let cart = await cartModel.findOne({ userId: userId });

    if (!cart) {
        // Create a new cart if it doesn't exist
        cart = new cartModel({
            userId: userId,
            items: [{ productId, quantity: 1, price: product.price }],
            totalQuantity: 1,
            totalPrice: product.price
        });
        await cart.save();
        return res.json({ msg: "Product added to cart", result: cart });
    }

    // Check if the product is already in the cart
    const item = cart.items.find((item) => item.productId.toString() === productId.toString());

    if (item) {
        // If product exists, increment its quantity and update price
        item.quantity += 1;
        item.price = product.price; // Update price if needed
    } else {
        // Add new product to the cart
        cart.items.push({ productId, quantity: 1, price: product.price });
    }

    // Update total quantity and total price
    cart.totalQuantity = cart.items.reduce((acc, item) => acc + item.quantity, 0);
    cart.totalPrice = cart.items.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    // Save the updated cart
    await cart.save();
    res.json({ msg: "Product added/updated in cart", cart });
});
