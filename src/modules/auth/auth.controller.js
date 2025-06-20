import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import handleAsync from "../../common/utils/handleAsync.js";
import User from "../user/user.model.js";
import createError from "../../common/utils/error.js";
import MESSAGES from "../../common/contstants/messages.js";
import createResponse from "../../common/utils/response.js";
import { JWT_EXPIRES_IN, JWT_SECRET_KEY } from "../../common/configs/environments.js";

export const authRegister = handleAsync(async (req, res, next) => {
	const { email, password } = req.body;
	const existingUser = await User.findOne({ email });
	if (existingUser) {
		return next(createError(400, MESSAGES.AUTH.EMAIL_ALREADY_EXISTS));
	}
	const salt = bcrypt.genSaltSync(10);
	const hash = bcrypt.hashSync(password, salt);

	// * Create User
	const newUser = await User.create({
		...req.body,
		password: hash,
		role: "guest",
	});

	if (!newUser) {
		return next(createError(500, MESSAGES.AUTH.REGISTER_FAILED));
	}

	// * Response
	newUser.password = undefined;
	return res.status(201).json(createResponse(true, 201, MESSAGES.AUTH.REGISTER_SUCCESS, newUser));
});

export const authLogin = handleAsync(async (req, res, next) => {
	const { email, password } = req.body;
	const existingUser = await User.findOne({ email });
	if (!existingUser) {
		return next(createError(400, MESSAGES.AUTH.USER_NOT_EXIST));
	}

	const isMatch = bcrypt.compareSync(password, existingUser.password);
	if (!isMatch) return next(createError(400, MESSAGES.AUTH.LOGIN_FAILED));

	const accessToken = jwt.sign({ id: existingUser._id }, JWT_SECRET_KEY, { expiresIn: JWT_EXPIRES_IN });

	if (accessToken) {
		existingUser.password = undefined;
		return res.status(200).json(
			createResponse(true, 200, MESSAGES.AUTH.LOGIN_SUCCESS, {
				user: existingUser,
				accessToken,
			})
		);
	}

	return next(createError(500, MESSAGES.AUTH.LOGIN_FAILED));
});
