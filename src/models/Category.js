import mongoose, { Schema } from "mongoose";

const categorySchema = new Schema({
  title: {
    type: String,
    unique: true,
    required: true
  },
  description: {
    type: String, 

  },
  slug: {
    type: String,
    unique: true,
    required: true
  }
}, {versionKey: false, timestamps: true})

export default mongoose.model("Category", categorySchema)