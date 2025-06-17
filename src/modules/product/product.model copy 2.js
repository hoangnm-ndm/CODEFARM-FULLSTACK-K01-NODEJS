import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
	{
		title: { type: String, required: true },
		thumbnail: { type: String, required: true },
		description: { type: String, default: "" },
		shortDescription: { type: String, default: "" },
		specifications: { type: Object, default: {} },
		priceDefault: { type: Number, required: true },
		slug: { type: String, required: true, unique: true },
		brandId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Brand",
			required: true,
		},
		subCategoryId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "SubCategory",
			required: true,
		},
		soldCount: { type: Number, default: 0 },
		variants: [
			{
				id: { type: String, required: true },
				size: { type: String, required: true, enum: ["S", "M", "L", "XL", "XXL"] },
				color: { type: String, required: true, enum: ["Red", "Blue", "Green", "Black", "White"] },
				// material: { type: String, required: true },
				// weight: { type: Number, required: true },
				stock: { type: Number, default: 0 },
				price: { type: Number, required: true },
				oldPrice: { type: Number, default: 0 },
				images: { type: [String], default: [] },
				sku: { type: String, required: true, unique: true },
				barcode: { type: String, required: true, unique: true },
			},
		],
		seoTitle: { type: String, default: "" },
		seoDescription: { type: String, default: "" },
		tags: { type: [String], default: [] },

		deletedAt: { type: Date, default: null },
		deletedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
	},
	{ versionKey: false, timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
