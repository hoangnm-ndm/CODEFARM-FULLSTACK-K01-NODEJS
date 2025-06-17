import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
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
				product: { type: String, required: true }, // * Product title or name at the time of order
				quantity: { type: Number, default: 1 },
				variantId: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "Variant",
				},
				price: { type: Number, required: true }, // * Price at the time of order
			},
		],
		totalPrice: { type: Number, required: true },
		address: {
			type: String,
			required: true,
		},
		phoneNumber: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true, versionKey: false }
);
