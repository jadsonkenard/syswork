import express from "express";
import TicketController from "../controllers/TicketController.js";
import {authorizeAdmin} from "./../middlewares/authorizeAdmin.js"

const router = express.Router();

router.get("/all", authorizeAdmin, TicketController.getAll);
router.post("/", TicketController.store);
router.get("/my", TicketController.getMyTickets);
router.get("/:id", authorizeAdmin, TicketController.findById);
router.put("/:id", TicketController.update);
router.patch("/:id/status", TicketController.updateStatus);
router.delete("/:id", authorizeAdmin, TicketController.delete);
router.get("/tickets/user/:id", authorizeAdmin, TicketController.getTicketByUser);

export default router;
