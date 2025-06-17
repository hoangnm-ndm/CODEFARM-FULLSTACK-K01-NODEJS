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
				options: [
					{
						attribute: { type: String, required: true },
						attributeValue: { type: String, required: true },
					},
				],
				stock: { type: Number, default: 0 },
				price: { type: Number, default: 0 },
				images: { type: [String], default: [] },
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
