import mongoose from "mongoose";

const attributeSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		code: [{ type: String, required: true }],

		deletedAt: { type: Date, default: null },
		deletedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
	},
	{
		versionKey: false,
		timestamps: true,
	}
);

const Attribute = mongoose.model("Attribute", attributeSchema);

export default Attribute;
