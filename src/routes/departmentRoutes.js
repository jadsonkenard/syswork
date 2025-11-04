import express from "express";
import DepartmentController from "../controllers/DepartmentController.js";

const router = express.Router();

router.get("/", DepartmentController.getAll);
router.post("/", DepartmentController.store);
router.get("/:id", DepartmentController.findById);
router.put("/:id", DepartmentController.update);
router.delete("/:id", DepartmentController.delete);
router.get(
  "/ticket/requested/:id",
  DepartmentController.getTicketRequestedDepartment
);
router.get(
  "/ticket/executor/:id",
  DepartmentController.getTicketExecutorDepartment
);

export default router;
