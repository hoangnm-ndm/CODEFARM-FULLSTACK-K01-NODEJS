import handleAsync from "../../common/utils/handleAsync";

export const createCart = handleAsync(async (req, res, next) => {
	const user = req.user;
	console.log("cart: ", user);
});
