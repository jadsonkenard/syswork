import express from "express";
import TicketController from "../controllers/TicketController.js";

const router = express.Router();

router.get("/", TicketController.getAll);
router.post("/", TicketController.store);
router.get("/my", TicketController.getMyTickets);
router.get("/:id", TicketController.findById);
router.put("/:id", TicketController.update);
router.patch("/:id/status", TicketController.updateStatus);
router.delete("/:id", TicketController.delete);
router.get("/tickets/user/:id", TicketController.getTicketByUser);

export default router;
