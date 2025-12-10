import express from "express";
import DepartmentController from "../controllers/DepartmentController.js";
import { authorizeAdmin } from "./../middlewares/authorizeAdmin.js";

const router = express.Router();

router.get("/", DepartmentController.getAll);
router.post("/", authorizeAdmin, DepartmentController.store);
router.get("/executor/my", DepartmentController.getTicketsMyDepartment);
router.get("/requester/my", DepartmentController.getTicketsToDepartment);
router.get("/:id", authorizeAdmin, DepartmentController.findById);
router.put("/:id", authorizeAdmin, DepartmentController.update);
router.delete("/:id", authorizeAdmin, DepartmentController.delete);
router.get("/ticket/requested/:id", authorizeAdmin, DepartmentController.getTicketRequestedDepartment);
router.get("/ticket/executor/:id", authorizeAdmin, DepartmentController.getTicketExecutorDepartment);

export default router;
