import mongoose from "mongoose";

const attributeValueSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		code: { type: String, required: true },

		deletedAt: { type: Date, default: null },
		deletedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
		attribute: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Attribute",
			required: true,
		},
	},
	{ versionKey: false, timestamps: true }
);

const AttributeValue = mongoose.model("AttributeValue", attributeValueSchema);

export default AttributeValue;
