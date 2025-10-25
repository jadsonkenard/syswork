import express from "express";
import PositionController from "../controllers/PositionController.js";

const router = express.Router();

router.get("/positions", PositionController.getAll);
router.post("/positions", PositionController.store);
router.get("/positions/:id", PositionController.findById);
router.put("/positions/:id", PositionController.update);
router.delete("/positions/:id", PositionController.delete);

export default router;
