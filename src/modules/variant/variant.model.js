import mongoose from "mongoose";

const variantSchema = new mongoose.Schema(
	{
		title: { type: String, required: true },
		thumbnail: { type: String, required: true },
		price: { type: Number, required: true },
		oldPrice: { type: Number, default: null },
		sku: { type: String, required: true, unique: true }, // * Stock Keeping Unit
		stock: { type: Number, default: 0 },
		productId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Product",
			required: true,
		},
		attributeId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Attribute",
			required: true,
		},
		attributeValueId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "AttributeValue",
			required: true,
		},
		deletedAt: { type: Date, default: null },
		deletedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
	},
	{
		versionKey: false,
		timestamps: true,
	}
);

const Variant = mongoose.model("Variant", variantSchema);

export default Variant;
