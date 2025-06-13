import Category from "./category.model";
import createError from "../../common/utils/error.js";
import createResponse from "../../common/utils/response.js";
import handleAsync from "../../common/utils/handleAsync.js";
import MESSAGES from "../../common/contstants/messages.js";

export const createCategory = handleAsync(async (req, res, next) => {
	const existing = await Category.findOne({ title: req.body.title });
	if (existing) return next(createError(400, MESSAGES.CATEGORY.CREATE_ERROR_EXISTS));
	const data = await Category.create(req.body);
	return res.json(createResponse(true, 201, MESSAGES.CATEGORY.CREATE_SUCCESS, data));
});

export const getListCategory = handleAsync(async (req, res, next) => {
	const data = await Category.find();
	return res.json(createResponse(true, 200, MESSAGES.CATEGORY.GET_SUCCESS, data));
});

export const getDetailCategory = handleAsync(async (req, res, next) => {
	const data = await Category.findById(req.params.id);
	if (!data) {
		next(createError(404, "Category not found!"));
	}
	return res.json(createResponse(true, 200, "Get detail category successfully!", data));
});

export const updateCategory = handleAsync(async (req, res, next) => {
	const data = await Category.findByIdAndUpdate(req.params.id, req.body);
	if (data) return res.json(createResponse(true, 200, "Update category successfully!", data));
	next(createError(false, 404, "Category update failed!"));
});

export const deleteCategory = handleAsync(async (req, res, next) => {
	const data = await Category.findByIdAndDelete(id);
	if (data) return res.json(createResponse(true, 200, "Delete successfully!"));
	next(createError(false, 404, "Category delete failed!"));
});

export const softDeleteCategory = handleAsync(async (req, res, next) => {
	const { id } = req.params;
	if (id) {
		await Category.findOneAndUpdate(
			{ id, deletedAt: null },
			{
				deletedAt: new Date(),
			}
		);
		return res.json(createResponse(true, 200, "Hidden category successfully!"));
	}
	next(createError(false, 404, "Hidden category failed!"));
});

export const restoreCategory = handleAsync(async (req, res, next) => {
	const { id } = req.params;
	if (id) {
		await Category.findOneAndUpdate(
			{ id, deletedAt: { $ne: null } },
			{
				deletedAt: null,
			}
		);
		// ne = not equal
		return res.json(createResponse(true, 200, "Restore category successfully!"));
	}
	next(createError(false, 404, "Restore category failed!"));
});
