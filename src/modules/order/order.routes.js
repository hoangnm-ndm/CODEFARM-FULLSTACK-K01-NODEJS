import Router from "express";
import { createPayosPayment, returnConfirmPayment } from "./order.controler.js";

const router = Router();
router.post("/createPayos", createPayosPayment);
router.get("/return", returnConfirmPayment);
export default router;
