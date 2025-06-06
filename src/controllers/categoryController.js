import Category from "../models/Category"
import handleAsync from "../utils/handleAsync"
import createResponse from "../utils/response"
import createError from "../utils/error"

export const createCategory = handleAsync( async (req, res, next) => {
    const existing = await Category.findOne({ title: req.body.title })
    if(existing) return next(createError(400, "This category already exists!"))
    const data = await Category.create(req.body)
    return res.json(createResponse(true, 201, "Create Category successfully!", data))
})