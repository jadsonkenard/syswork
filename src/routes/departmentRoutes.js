import express from "express";
import DepartmentController from "../controllers/DepartmentController.js";

const router = express.Router();

router.get("/department", DepartmentController.getAll);
router.post("/department", DepartmentController.store);
router.get("/department/:id", DepartmentController.findById);
router.put("/department/:id", DepartmentController.update);
router.delete("/department/:id", DepartmentController.delete);
router.get(
  "/department/ticket/requested/:id",
  DepartmentController.getTicketRequestedDepartment
);
router.get(
  "/department/ticket/executor/:id",
  DepartmentController.getTicketExecutorDepartment
);

export default router;
