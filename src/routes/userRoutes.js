import express from "express";
import UserController from "../controllers/UserController.js";

const router = express.Router();

router.get("/users", UserController.getAll);
router.post("/users", UserController.store);
router.get("/users/:id", UserController.findById);
router.put("/users/:id/update", UserController.update);
router.put("/users/:id/update/password", UserController.updatePassword);
router.delete("/users/:id/delete", UserController.delete)

export default router;
