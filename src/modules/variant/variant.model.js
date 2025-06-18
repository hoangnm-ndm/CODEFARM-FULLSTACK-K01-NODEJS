import mongoose from "mongoose";

const variantSchema = new mongoose.Schema(
	{
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
		stock: { type: Number, default: 0 },
		price: { type: Number, default: 0 },
		oldPrice: { type: Number, default: 0 },
		images: [
			{
				type: String,
				required: true,
			},
		],
	},
	{
		versionKey: false,
		timestamps: true,
	}
);

const Variant = mongoose.model("Variant", variantSchema);

export default Variant;
