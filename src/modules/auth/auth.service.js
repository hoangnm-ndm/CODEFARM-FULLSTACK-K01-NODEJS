import Cart from "../cart/cart.model.js";

const createCartForUser = async (userId) => {
	const cart = await Cart.create();
};
