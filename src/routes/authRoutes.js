import express from "express";
import authController from "../controllers/authController.js";

const router = express.Router();

router.post("/auth/login", authController.login);
router.post("/auth/refresh", authController.refresh);
router.post("/auth/logout", authController.logout);

export default router;
