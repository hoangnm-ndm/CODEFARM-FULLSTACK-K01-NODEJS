// Table Product {
//   id string
//   title string
//   thumbnail string
//   description string
//   shortDescription string
//   specifications object
//   price number
//   oldPrice number
//   slug string
//   brand string [ref: > Brand.id]
//   subCategory string [ref: > SubCategory.id]
//   color productColors
//   size productSizes
//   stock number
//   soldCount number

import mongoose from "mongoose";

//   seoTitle string
//   seoDescription string
//   tags array

//   deletedAt datetime [default: null]
//   updatedAt datetime [default: `now()`]
//   deletedBy string [ref: > User.id]
//   updatedBy string [ref: > User.id]
// }

const productSchema = new mongoose.Schema(
	{
		title: { type: String, required: true },
		thumbnail: { type: String, required: true },
		description: { type: String, default: "" },
		shortDescription: { type: String, default: "" },
		specifications: { type: Object, default: {} },
		price: { type: Number, required: true },
		oldPrice: { type: Number, default: 0 },
		slug: { type: String, required: true, unique: true },
		brand: { type: mongoose.Schema.Types.ObjectId, ref: "Brand", required: true },
		subCategory: { type: mongoose.Schema.Types.ObjectId, ref: "SubCategory", required: true },
		color: { type: [String], default: [] }, // Assuming productColors is an array of strings
		size: { type: [String], default: [] }, // Assuming productSizes is an array of strings
		stock: { type: Number, default: 0 },
		soldCount: { type: Number, default: 0 },

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
