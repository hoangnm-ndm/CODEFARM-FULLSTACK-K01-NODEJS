import { Router } from "express"
import { createCategory } from "../controllers/categoryController.js"

const categoryRoutes = Router()

categoryRoutes.post("/", createCategory)

export default categoryRoutes