import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
	{
		fullName: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
			lowercase: true,
		},
		password: {
			type: String,
			required: true,
		},
		phoneNumber: {
			type: String,
		},
		isVerifyEmail: {
			type: Boolean,
			default: false,
		},
		isVerifyPhone: {
			type: Boolean,
			default: false,
		},
		role: {
			type: String,
			default: "guest",
		},
		address: {
			type: String,
			default: "",
		},
		bios: {
			type: String,
		},
		avatar: {
			type: String,
			default:
				"https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg",
		},
		isActive: {
			type: Boolean,
			default: true,
		},
		social: {
			facebook: { type: String, default: "" },
			google: { type: String, default: "" },
			github: { type: String, default: "" },
			twitter: { type: String, default: "" },
		},
	},
	{
		versionKey: false,
		timestamps: true,
	}
);

const User = mongoose.model("User", userSchema);

export default User;
