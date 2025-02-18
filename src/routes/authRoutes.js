import express from "express";
import AuthController from "../controllers/authController.js";

const router = express.Router();



router.post("/login", AuthController.login);
router.post("/logout", AuthController.logout);
router.get("/check-auth", AuthController.checkAuth);

export default router;