import express from "express";
import UserController from "../controllers/UserController.js";

const router = express.Router();

router.get("/", UserController.getAll);
router.post("/", UserController.store);
router.get("/:id", UserController.findById);
router.put("/:id/update", UserController.update);
router.put("/:id/update/password", UserController.updatePassword);
router.delete("/:id/delete", UserController.delete);
router.get("/positions/:id", UserController.getUserByPosition);
router.get("/department/:id", UserController.getUserByDepartment);

export default router;
