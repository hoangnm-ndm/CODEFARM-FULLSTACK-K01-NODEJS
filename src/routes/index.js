import { Router } from "express";

import categoryRoutes from "../modules/category/category.routes.js";
import subCategoryRoutes from "../modules/subcategory/subcategory.routes.js";
import productRoutes from "../modules/product/product.routes.js";
import authRoutes from "../modules/auth/auth.routes.js";

const router = Router();

router.use("/auth", authRoutes);

// router.use("/products", productRoutes);
router.use("/categories", categoryRoutes);
router.use("/sub-categories", subCategoryRoutes);
router.use("/products", productRoutes);

export default router;
