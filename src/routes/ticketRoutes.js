import express from "express";
import TicketController from "../controllers/TicketController.js";

const router = express.Router();

router.get("/ticket", TicketController.getAll);
router.post("/ticket", TicketController.store);
router.get("/ticket/:id", TicketController.findById);
router.put("/ticket/:id", TicketController.update);
router.patch("/ticket/:id/status", TicketController.updateStatus);
router.delete("/ticket/:id", TicketController.delete);

export default router;
