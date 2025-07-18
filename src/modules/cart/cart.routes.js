import { Router } from "express";
import { updateCart, deleteCart, getCart } from "./cart.controller";

const cartRouter = Router();

cartRouter.patch("/", updateCart);
cartRouter.get("/", getCart);
cartRouter.delete("/", deleteCart);

export default cartRouter;
