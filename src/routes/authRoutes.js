import express from "express";
import authController from "../controllers/authController.js";

const router = express.Router();

router.post("/api/auth/login", authController.login);
router.post("/api/auth/refresh", authController.refresh);
router.post("/api/auth/logout", authController.logout);

export default router;
