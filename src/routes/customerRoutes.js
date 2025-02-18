import express from "express";
import CustomerController from "../controllers/customerController.js";

const router = express.Router();

router.post("/insert_user", CustomerController.createCustomer);

export default router;