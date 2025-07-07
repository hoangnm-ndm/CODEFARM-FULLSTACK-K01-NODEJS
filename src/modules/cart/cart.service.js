import Cart from "./cart.model";

export const createCartForUser = async (userId) => {
	const cart = await Cart.create({
		user: userId,
		items: [],
	});

	return cart;
};
