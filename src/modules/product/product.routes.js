import { Router } from "express";
import { getDetailProduct, getListProduct } from "./product.controller.js";

const productRoutes = Router();

productRoutes.get("/", getListProduct);
productRoutes.get("/:id", getDetailProduct);

export default productRoutes;
