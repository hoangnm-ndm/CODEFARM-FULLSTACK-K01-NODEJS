import { Router } from "express";
import { authLogin, authRegister } from "./auth.controller";
import { loginSchema, registerSchema } from "./auth.schema";
import validBodyRequest from "../../common/middlewares/validBodyRequest.js";

const authRoutes = Router();

authRoutes.post("/register", validBodyRequest(registerSchema), authRegister);
authRoutes.post("/login", validBodyRequest(loginSchema), authLogin);

export default authRoutes;
