import { Router } from "express";
import { verifyUser } from "../../common/middlewares/verifyUser";
import { createCart } from "./cart.controller";

const cartRouter = Router();

/**
 * GET /cart
 * CREATE /cart
 * UPDATE /cart/:id
 * DELETE /cart/:id
 */

cartRouter.post("/", verifyUser, createCart);

export default cartRouter;
