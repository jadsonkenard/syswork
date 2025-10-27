import express from "express";
import TicketController from "../controllers/TicketController.js";

const router = express.Router();

router.get("/ticket", TicketController.getAll);
router.post("/ticket", TicketController.store);
router.get("/ticket/:id", TicketController.findById);
router.put("/ticket/:id", TicketController.update);
router.put("/ticket/status/:id", TicketController.updateStatus);

export default router;
