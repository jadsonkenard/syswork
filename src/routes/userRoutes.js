import express from "express";
import UserController from "../controllers/UserController.js";
import { authorizeAdmin } from "../middlewares/authorizeAdmin.js";

const router = express.Router();

router.get("/", authorizeAdmin, UserController.getAll);
router.post("/", authorizeAdmin, UserController.store);
router.get("/:id", authorizeAdmin, UserController.findById);
router.put("/:id/update", authorizeAdmin, UserController.update);
router.put("/:id/update/password", authorizeAdmin, UserController.updatePassword);
router.delete("/:id/delete", authorizeAdmin, UserController.delete);
router.get("/positions/:id", authorizeAdmin, UserController.getUserByPosition);
router.get("/department/:id", authorizeAdmin, UserController.getUserByDepartment);

export default router;
