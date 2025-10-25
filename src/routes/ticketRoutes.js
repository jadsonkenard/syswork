import express from "express";
import TicketController from "../controllers/TicketController.js";

const router = express.Router();

// router.get("/ticket", TicketController.getAll);
router.post("/ticket", TicketController.store);

export default router;
