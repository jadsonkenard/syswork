import express from "express";
import UserController from "../controllers/UserController.js";

const router = express.Router();

router.get("/users", UserController.getAll);
router.post("/users", UserController.store);
router.get("/users/:id", UserController.findById);

export default router;
