import express from "express";
import DepartamentController from "../controllers/DepartamentController.js";

const router = express.Router();

router.get("/departament", DepartamentController.getAll);
router.post("/departament", DepartamentController.store);
router.get("/departament/:id", DepartamentController.findById);
router.put("/departament/:id", DepartamentController.update);
router.delete("/departament/:id", DepartamentController.delete);

export default router;
