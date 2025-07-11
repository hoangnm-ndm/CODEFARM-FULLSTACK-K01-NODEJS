import { Router } from "express";
import { authLogin, authRegister } from "./auth.controller.js";
import { loginSchema, registerSchema } from "./auth.schema.js";
import validBodyRequest from "../../common/middlewares/validBodyRequest.js";

const authRoutes = Router();

authRoutes.post("/register", validBodyRequest(registerSchema), authRegister);
authRoutes.post("/login", validBodyRequest(loginSchema), authLogin);

export default authRoutes;
