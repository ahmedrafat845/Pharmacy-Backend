import mongoose from "mongoose";


const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
            quantity: { type: Number, required: true }
        }
    ],
    totalPrice: {
        type: Number,
        required: true
    },
    paymentMethod: {
        type: String,
        required: true,
        enum: ['cash', 'credit-card', 'paypal']
    },
    status: {
        type: String,
        default: 'pending'
    }
}, { timestamps: true });

export const orderModel = mongoose.model('Order', orderSchema);

