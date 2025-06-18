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
				// * Xem thông tin hiện tại của sản phẩm theo id reference sang Product
				productId: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "Product",
					required: true,
				},
				quantity: { type: Number, required: true, min: 1 },
				price: { type: Number, required: true, min: 0 },
				product: {
					type: String,
					required: true,
				},
			},
		],
		totalPrice: { type: Number, required: true, min: 0 },
		currency: { type: String, required: true, default: "USD" },
		status: {
			type: String,
			enum: ["pending", "shipping", "completed", "cancelled"],
			default: "pending",
		},
	},
	{
		versionKey: false,
		timestamps: true,
	}
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
