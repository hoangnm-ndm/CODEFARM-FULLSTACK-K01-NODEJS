import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import handleAsync from "../../common/utils/handleAsync.js";
import User from "../user/user.model.js";
import createError from "../../common/utils/error.js";
import MESSAGES from "../../common/contstants/messages.js";
import createResponse from "../../common/utils/response.js";
import {
	JWT_EXPIRES_IN,
	JWT_SECRET_KEY,
	JWT_SECRET_KEY_FOR_EMAIL,
	JWT_EXPIRES_IN_FOR_EMAIL,
} from "../../common/configs/environments.js";
import sendEmail from "../../common/utils/mailSender.js";

import { createCartForUser } from "../cart/cart.service.js";

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

	// * Verify email
	const verifyEmailToken = jwt.sign({ id: newUser._id }, JWT_SECRET_KEY_FOR_EMAIL, {
		expiresIn: JWT_EXPIRES_IN_FOR_EMAIL,
	});

	const verifyEmailLink = `http://localhost:8888/api/auth/verify-email/${verifyEmailToken}`;

	sendEmail(
		newUser.email,
		"Verify your email",
		`
      Xin chao ${newUser.fullName || "User"},);
      Vui long click vào link dưới đây để xác thực email của bạn:
      <a href="${verifyEmailLink}">Xác thực email</a>
      <br>
      Nếu bạn không đăng ký tài khoản này, vui lòng bỏ qua email này.
      <br>
      Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi!
  `
	);

	// * Thêm giỏ hàng mặc định cho người dùng
	const cart = await createCartForUser(newUser._id);
	console.log(cart);

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

	const isVerifyEmail = existingUser.isVerifyEmail || false;
	if (!isVerifyEmail) {
		return next(createError(400, MESSAGES.AUTH.EMAIL_NOT_VERIFIED));
	}

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

export const authLogout = handleAsync(async (req, res, next) => {});

export const authRefreshToken = handleAsync(async (req, res, next) => {});

export const authForgotPassword = handleAsync(async (req, res, next) => {});

export const authResetPassword = handleAsync(async (req, res, next) => {});
