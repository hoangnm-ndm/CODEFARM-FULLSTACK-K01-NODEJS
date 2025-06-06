import Category from "../models/Category"
import createError from "../utils/error"
import handleAsync from "../utils/handleAsync"
import createResponse from "../utils/response"

export const createCategory = handleAsync( async (req, res, next) => {
    const data = await Category.create(req.body)
    if(data) {
      return createResponse(true, 201, "Create Category successfully!", data)
    }
    next(createError(400, "Create Category failed!"))
})