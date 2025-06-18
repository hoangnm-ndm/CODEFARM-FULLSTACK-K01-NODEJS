import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		products: [
			{
				productId: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "Product",
					required: true,
				},
				quantity: { type: Number, required: true, min: 1 },
			},
		],
		totalPrice: { type: Number, required: true, min: 0 },
		currency: { type: String, required: true, default: "USD" },
	},
	{
		versionKey: false,
		timestamps: true,
	}
);

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;
