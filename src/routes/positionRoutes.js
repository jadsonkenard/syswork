import express from "express";
import PositionController from "../controllers/PositionController.js";
import { authorizeAdmin } from "./../middlewares/authorizeAdmin.js";

const router = express.Router();

router.get("/", PositionController.getAll);
router.post("/", authorizeAdmin, PositionController.store);
router.get("/:id", authorizeAdmin, PositionController.findById);
router.put("/:id", authorizeAdmin, PositionController.update);
router.delete("/:id", authorizeAdmin, PositionController.delete);

export default router;
