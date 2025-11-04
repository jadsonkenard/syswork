import express from "express";
import PositionController from "../controllers/PositionController.js";
import { authenticateToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

// router.use(authenticateToken);

router.get("/positions", PositionController.getAll);
router.post("/positions", PositionController.store);
router.get("/positions/:id", PositionController.findById);
router.put("/positions/:id", PositionController.update);
router.delete("/positions/:id", PositionController.delete);

export default router;
