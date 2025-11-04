import express from "express";
import PositionController from "../controllers/PositionController.js";

const router = express.Router();

router.get("/", PositionController.getAll);
router.post("/", PositionController.store);
router.get("/:id", PositionController.findById);
router.put("/:id", PositionController.update);
router.delete("/:id", PositionController.delete);

export default router;
