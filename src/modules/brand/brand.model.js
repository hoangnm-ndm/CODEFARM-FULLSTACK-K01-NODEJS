// Table Brand {
//   id string
//   title string
//   logoUrl string
//   description string
//   deletedAt datetime [default: null]
//   slug string
// }

const brandSchema = new mongoose.Schema(
	{
		title: { type: String, required: true },
		logoUrl: { type: String, required: true },
		description: { type: String, default: "" },
		deletedAt: { type: Date, default: null },
		slug: { type: String, required: true, unique: true },
	},
	{
		versionKey: false,
		timestamps: true,
	}
);

const Brand = mongoose.model("Brand", brandSchema);

export default Brand;
